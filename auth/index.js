const jwt = require('jsonwebtoken');
const { use } = require('../api/components/user/network');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

const check = {
  own: function(req, owner) {
    let decoded = decodeHeader(req);
    if (decoded.id != owner) {
      throw new Error('Unauthorized');
    }
  },
  auth: function(req) {
    let user = decodeHeader(req);
    return user.id;
  },
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw new Error('No token');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid token');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  let authorization = req.headers.authorization || '';
  let token = getToken(authorization);
  let decoded = verify(token);
  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check
};
