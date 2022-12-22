const { sendMail } = require("./utils/sendEmail.js");
const { makeRequest } = require("./utils/makeRequest.js");
const { SUCCESS, FAILURE } = require("./utils/constants.js");
const {
  create: createHealthCheckRecord,
  get: getHealthCheckRecods,
} = require("./repository/healthCheck");

exports.handler = async (event, context, callback) => {
  const url = "http://www.facebooasdsadk1.com/";
  const checkUrl = await isWebsiteUp(url);
  console.log(checkUrl);

  await createHealthCheckRecord({
    url,
    state: checkUrl ? "UP" : "DOWN",
    region: "us-east-1",
  });

  if (!checkUrl) {
    const prevRecords = await getHealthCheckRecods({
      url: "http://www.facebooasdsadk1.com/",
      region: "us-east-1",
    });
    console.log(prevRecords);
    return null;
    //return sendMail(event, callback);
  }
};

const isWebsiteUp = async (url) => {
  const options = new URL(url);

  const response = await makeRequest(options);

  return response === SUCCESS ? true : false;
};
