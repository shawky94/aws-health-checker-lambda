const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamo = new aws.DynamoDB.DocumentClient();

const BASE_TABLE_NAME = "healthCheck";

const get = async ({url, state, region = 'us-east-1'}) => {
    console.log(url)
    
    const params = {
    TableName: `${BASE_TABLE_NAME}-${region}`,
    FilterExpression: "checkFromRegion = :t",
    KeyConditionExpression: "checkUrl = :s and checkTimestamp < :r",
    ScanIndexForward: false,
    Limit: 3,
    ExpressionAttributeValues: {
        ":s": url,
        ":r": Date.now(),
        ":t": region
    }
}
    return dynamo
      	.query(params)
      	.promise();
}

const create = async ({url, state, region = 'us-east-1'}) => {
  return dynamo
      	.put({
        	TableName:`${BASE_TABLE_NAME}-${region}`,
        	Item: {
            checkUrl: url,
          	checkResult: state,
          	checkFromRegion: region,
          	checkTimestamp: Date.now()
        	}
      	})
      	.promise();
}

module.exports = {
   create,
   get
}