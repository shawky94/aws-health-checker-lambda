const aws = require("aws-sdk");

const dynamo = new aws.DynamoDB.DocumentClient();

const BASE_TABLE_NAME = "checkUrl";

const list = async () => {
  const params = {
    TableName: `${BASE_TABLE_NAME}`,
  };
  return dynamo.scan(params).promise();
};

const create = async ({ url }) => {
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
