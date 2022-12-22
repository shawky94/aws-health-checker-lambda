const aws = require('aws-sdk');
const ses = new aws.SES({region: 'us-east-1'});

async function sendMail(event, callback) {
  const subject = "Hi there"
  const body = "this is a corn job test"
  const emailParams = {
        Destination: {
          ToAddresses: ["ahmedselsabagh94@gmail.com"],
        },
        Message: {
          Body: {
            Text: { Data: body },
          },
          Subject: { Data: subject },
        },
        Source: "ahmedselsabagh94@gmail.com",
  };
      
  try {
        let key = await ses.sendEmail(emailParams).promise();
        console.log("MAIL SENT SUCCESSFULLY!!");      

        callback(null, {
        'statusCode': 200,
        'body': 'sucess',
        'headers': { 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        }
    })
        

  } catch (e) {
        console.log("FAILURE IN SENDING MAIL!!", e);
  }  
  callback(null,true);
}

module.exports = {
    sendMail
}
