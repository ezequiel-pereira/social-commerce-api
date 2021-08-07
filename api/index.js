const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const error = require('../network/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(error);

app.listen(config.api.port, () => {
  console.log('Listening on port ', config.api.port);
});
