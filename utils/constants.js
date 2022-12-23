const SUCCESS = 200;
const FAILURE = 400;

const AWS_REGIONS_CODES = {
  US_EAST_1: "us-east-1",
  US_WEST_1: "us-west-1",
};

const SUPPORTED_REGIONS = Object.values(AWS_REGIONS_CODES);

const HEALTH_CHECK_RESULT = {
  UP: "UP",
  DOWN: "DOWN",
};

module.exports = {
  SUCCESS,
  FAILURE,
  AWS_REGIONS,
  HEALTH_CHECK_RESULT,
  SUPPORTED_REGIONS,
};
