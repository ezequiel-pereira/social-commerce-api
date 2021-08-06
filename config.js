module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'mysql_user',
    password: process.env.MYSQL_PASSWORD || 'Pa$$w0rd',
    database: process.env.MYSQL_DATABASE || 'test',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  }
};