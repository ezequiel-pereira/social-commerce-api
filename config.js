module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'ezequiel',
    password: process.env.MYSQL_PASSWORD || 'p4ssw0rd!',
    database: process.env.MYSQL_DATABASE || 'test',
  }
};