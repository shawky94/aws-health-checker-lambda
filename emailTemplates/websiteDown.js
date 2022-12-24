const template = `<!DOCTYPE html>
<html>
<body style="background: #ECDAD3;">

<h1 style="background-color: red; display: flex; justify-content: center">WARNING!</h1>
<img style="width: 100%;" src="https://personal-documents-me.s3.amazonaws.com/websiteDown.jpeg"></img>
<div>

<p>Website url: {{websiteUrl}}</p>

 

<p>Region: {{regionName}}</p>

<p style="font-weight: bold">Your website is DOWN please inform your technichal team ASAP.</p>

</div>

</body>
</html>`;

const getTemplate = (websiteUrl, regionName) => {
  return template
    .replace("{{websiteUrl}}", websiteUrl)
    .replace("{{regionName}}", regionName);
};

module.exports = {
  getTemplate,
};
