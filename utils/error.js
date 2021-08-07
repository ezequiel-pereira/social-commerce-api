function error(message, code) {
  let e = new Error(message);
  console.log('error util');
  if (code) {
    e.statusCode = code;
  }
  return e;
}

module.exports = error;