const aws = require("aws-sdk");
const { DynamoClient } = require("../dynamoClient");

const dynamo = DynamoClient.getInstance();

const BASE_TABLE_NAME = "admin";

const list = async () => {
  const params = {
    TableName: `${BASE_TABLE_NAME}`,
  };
  return dynamo.scan(params).promise();
};

const create = async ({ adminEmail }) => {
  if (!adminEmail) {
    throw new Error("missing mandatory parameter 'adminEmail'");
  }
  return dynamo
    .put({
      TableName: `${BASE_TABLE_NAME}`,
      Item: {
        adminEmail,
      },
    })
    .promise();
};

module.exports = {
  create,
  list,
};
