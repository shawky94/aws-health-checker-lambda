const aws = require("aws-sdk");
const { DynamoClient } = require("../dynamoClient");

const dynamo = DynamoClient.getInstance();

const BASE_TABLE_NAME = "checkUrl";

const list = async () => {
  const params = {
    TableName: `${BASE_TABLE_NAME}`,
  };
  return dynamo.scan(params).promise();
};

const create = async ({ url }) => {
  if (!url) {
    throw new Error("url parameter is missing");
  }

  return dynamo
    .put({
      TableName: `${BASE_TABLE_NAME}`,
      Item: {
        checkUrl: url,
      },
    })
    .promise();
};

module.exports = {
  create,
  list,
};
