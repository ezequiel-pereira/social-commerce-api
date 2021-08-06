const mysql = require('mysql');

const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log('DB Connected');
    }
  });

  connection.on('error', err => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
        throw err;
    }
  });
};

handleConnection();

async function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(error);
      resolve(data);
    });
  });
};

async function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(error);
      resolve(data);
    });
  });
};

async function upsert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

async function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
      if (err) return reject(err);
      result = JSON.parse(JSON.stringify(result[0]));
      resolve(result);
    });
  });
};

module.exports = {
  list,
  get,
  upsert,
  query
};
