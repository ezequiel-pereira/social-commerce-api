const response = require('./response');

function error(err, req, res, next) {
  console.error('[error]', err);

  let message = err.message || 'Internal server error';
  let status = err.statusCode || 500;
  console.log('network/error');
  response.error(req, res, message, status);
}

module.exports = error;