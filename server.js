/**
 * Declarations of dependencies
 * */
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const httpErrorModule = require('@coreplatform/node-http-error-module');
const correlationId = require('@coreplatform/correlationid-middleware');
const { authentication } = require('@coreplatform/authentication-middleware');
const logger = require('./config/logger');
const Routes = require('./routes');
const Database = require('./database');
const {
  PORT,
  DB_CONNECTIONSTRING,
  URL_IDENTITY_SERVICE,
} = require('./config');

const router = new Routes(express.Router(), new Database(DB_CONNECTIONSTRING)).register();

const app = express();

const dir = './logs';

/**
 * Create Dir if not exist
 */
try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
} catch (e) {
  logger.log('error', 'create directory error', { detail: e.toString() });
}

/**
 * List of all Middlewares used in project cors, compression, helmet
 * */
try {
  app.use(cors({
    exposedHeaders: [
      'location',
      'x-coreplatform-paging-limit',
      'x-coreplatform-total-records',
    ],
  }));
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(
    '/',
    correlationId,
    httpErrorModule(logger),
    authentication({ URL_IDENTITY_SERVICE }, logger),
    router,
  );
} catch (e) {
  logger.log('error', 'middleware error', { detail: e.toString() });
}

/**
 * Generating access.log to generate the logs using morgan logs are generated in
 * access.logs file inside logs folder
 * */
try {
  app.use(morgan('combined', {
    stream: fs.createWriteStream(path.resolve(process.cwd(), 'logs', 'access.log'), {
      flags: 'a',
    }),
  }));
} catch (e) {
  logger.log('error', 'morgan error', { detail: e.toString() });
}

/**
 * Start the app by listening <port>
 * */
app.listen(PORT);

module.exports = app;
