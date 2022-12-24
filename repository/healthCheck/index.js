const aws = require("aws-sdk");

const dynamo = new aws.DynamoDB.DocumentClient();

const BASE_TABLE_NAME = "healthCheck";

const constructPrimaryKey = (url, region) => {
  return `${url}^${region}`;
};

const get = async ({ url, region, numberOfRecords }) => {
  const params = {
    TableName: `${BASE_TABLE_NAME}`,
    FilterExpression: "checkFromRegion = :t",
    KeyConditionExpression: "checkUrl = :s and checkTimestamp < :r",
    ScanIndexForward: false, // descending on timestamp
    Limit: numberOfRecords,
    ExpressionAttributeValues: {
      ":s": constructPrimaryKey(url, region),
      ":r": Date.now(),
      ":t": region,
    },
  };
  return dynamo.query(params).promise();
};

const create = async ({ url, state, region }) => {
  return dynamo
    .put({
      TableName: `${BASE_TABLE_NAME}`,
      Item: {
        checkUrl: constructPrimaryKey(url, region),
        checkResult: state,
        checkFromRegion: region,
        checkTimestamp: Date.now(),
      },
    })
    .promise();
};

module.exports = {
  create,
  get,
};
