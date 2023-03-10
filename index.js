const { sendMail } = require("./utils/sendEmail.js");
const { makeRequest } = require("./utils/makeRequest.js");
const {
  SUCCESS,
  FAILURE,
  AWS_REGIONS_CODES,
  SUPPORTED_REGIONS,
  HEALTH_CHECK_RESULT,
} = require("./utils/constants.js");
const {
  create: createHealthCheckRecord,
  get: getHealthCheckRecods,
} = require("./repository/healthCheck");

const { list: getCheckURLRecods } = require("./repository/url");

const RUN_IN_MULTI_REGIONS = process.env.RUN_IN_MULTI_REGIONS === "true";
const MAIN_REGION = process.env.MAIN_REGION || AWS_REGIONS_CODES.US_EAST_1;

exports.handler = async (event, context, callback) => {
  const urls = (await getCheckURLRecods()).Items.map((item) => item.url);
  const promises = [];
  urls.forEach(async (url) => {
    promises.push(handleUrl(url));
  });

  return Promise.all(promises);
};

const handleUrl = async (url) => {
  const checkUrl = await isWebsiteUp(url);

  const regionCode = process.env.AWS_REGION;

  await createHealthCheckRecord({
    url,
    state: checkUrl ? HEALTH_CHECK_RESULT.UP : HEALTH_CHECK_RESULT.DOWN,
    region: regionCode,
  });

  if (!checkUrl) {
    const shouldSendEmail = await isFailureThresholdExceeded(url, regionCode);

    if (shouldSendEmail) {
      await sendMail({ websiteUrl: url, regionName: regionCode });
    }
  }
};

const isFailureThresholdExceeded = async (url, regionCode) => {
  if (RUN_IN_MULTI_REGIONS) {
    // 1 failure for each region
    const isLambdaRunningInMainRegion = regionCode === MAIN_REGION;

    if (isLambdaRunningInMainRegion === false) return false;

    const MAX_FAILURE_COUNT = 1;
    const prevRecordsPerRegionPromises = [];
    SUPPORTED_REGIONS.forEach((region) => {
      prevRecordsPerRegionPromises.push(
        getHealthCheckRecods({
          url,
          region,
          numberOfRecords: MAX_FAILURE_COUNT,
        })
      );
    });

    const allRegionsResult = (await Promise.all(prevRecordsPerRegionPromises))
      .map((item) => item.Items)
      .flat();

    return allRegionsResult.every(
      (item) => item.checkResult === HEALTH_CHECK_RESULT.DOWN
    );
  } else {
    // 3 successive failures when running in 1 region only
    const MAX_FAILURE_COUNT = 3;
    const prevRecords = await getHealthCheckRecods({
      url,
      region: regionCode,
      numberOfRecords: MAX_FAILURE_COUNT,
    });

    const items = prevRecords.Items;
    return (
      items.every((item) => item.checkResult === HEALTH_CHECK_RESULT.DOWN) &&
      items.length === MAX_FAILURE_COUNT
    );
  }
};

const isWebsiteUp = async (url) => {
  const response = await makeRequest(url);

  return response === SUCCESS ? true : false;
};
