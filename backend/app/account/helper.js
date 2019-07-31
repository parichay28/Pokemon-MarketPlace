const SHA256 = require('crypto-js/sha256');
const { APP_SECRET } = require('../../secrets/index.js');

const hash = string => {

    // SHA256 method returns an object with inner methods so to obtain hashed password .toString() i used
    return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
}

module.exports = { hash };