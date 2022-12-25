const aws = require("aws-sdk");
const { list: getAdminsList } = require("../repository/admin");

const ses = new aws.SES({ region: "us-east-1" });
const { getTemplate } = require("../emailTemplates/websiteDown");

const sendMail = async ({ websiteUrl, regionName }) => {
  // get admins from config db
  const admins = (await getAdminsList()).Items.map((item) => item.adminEmail);

  const subject = "Website is down warning";
  const emailParams = {
    Destination: {
      ToAddresses: admins,
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
    Source: admins?.[0],
  };

  try {
    await ses.sendEmail(emailParams).promise();
    console.log("MAIL SENT SUCCESSFULLY!!");
  } catch (e) {
    console.log("FAILURE IN SENDING MAIL!!", e);
  }
};

module.exports = {
  sendMail,
};
