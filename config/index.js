module.exports = {
  PORT: process.env.SERVER_PORT || 3002,
  VERSION: process.env.CIRCLE_TAG || '1.0.0',
  DATA_RECORD_LIMIT: process.env.DATA_RECORD_LIMIT || 100,
  DB_CONNECTIONSTRING: process.env.DB_CONNECTIONSTRING,
  URL_IDENTITY_SERVICE: process.env.URL_IDENTITY_SERVICE || 'http://localhost:5000',
  URL_TENANCY_SERVICE: process.env.URL_TENANCY_SERVICE || 'http://localhost:5002',
};
