const aws = require("aws-sdk");

const ses = new aws.SES({ region: "us-east-1" });
const { getTemplate } = require("../emailTemplates/websiteDown");

async function sendMail({ websiteUrl, regionName }) {
  const subject = "Website is down warning";
  const emailParams = {
    Destination: {
      ToAddresses: ["ahmedselsabagh94@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: getTemplate(websiteUrl, regionName),
        },
      },
      Subject: { Data: subject },
    },
    Source: "ahmedselsabagh94@gmail.com",
  };

  try {
    await ses.sendEmail(emailParams).promise();
    console.log("MAIL SENT SUCCESSFULLY!!");
  } catch (e) {
    console.log("FAILURE IN SENDING MAIL!!", e);
  }
}

module.exports = {
  sendMail,
};
