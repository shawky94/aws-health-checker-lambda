var http = require('http');
const { SUCCESS, FAILURE } = require("./constants.js") ;

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    let req = http.request(options);

    req.on('response', res => {
      resolve(SUCCESS);
    });

    req.on('error', err => {
      resolve(FAILURE);
    });

    req.end();
  });
}

module.exports = {
   makeRequest 
}