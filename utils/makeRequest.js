const https = require("https");
const http = require("http");

const { SUCCESS, FAILURE } = require("./constants.js");

const httpsRequest = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      host: url,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      resolve(SUCCESS);
    });

    req.on("error", (e) => {
      resolve(FAILURE);
    });
    req.end();
  });
};

const httpRequest = (url) => {
  return new Promise((resolve, reject) => {
    try {
      const req = http.get(url, () => {
        resolve(SUCCESS);
      });

      req.on("error", (e) => {
        resolve(FAILURE);
      });

      req.end();
    } catch (e) {
      resolve(false);
    }
  });
};

const makeRequest = async (url) => {
  const urlWithoutProtocolAndTrailingForwardSlash = cleanUrl(url);

  const [httpsResponse, httpRespone] = await Promise.all([
    httpsRequest(urlWithoutProtocolAndTrailingForwardSlash),
    httpRequest(urlWithoutProtocolAndTrailingForwardSlash),
  ]);

  return httpsResponse || httpRespone;
};

const cleanUrl = (url) => {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

module.exports = {
  makeRequest,
};
