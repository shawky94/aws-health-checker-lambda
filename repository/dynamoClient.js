// implement singleton pattern for dynamo client
const aws = require("aws-sdk");

class DynamoClient {
  static instance;

  constructor() {}

  static getInstance() {
    if (!DynamoClient.instance) {
      DynamoClient.instance = new aws.DynamoDB.DocumentClient();
    }

    return DynamoClient.instance;
  }
}
module.exports = {
  DynamoClient,
};
