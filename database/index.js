const Sequelize = require('sequelize');
const logger = require('../config/logger');
const Models = require('./models');

class Database {
  constructor(DB_CONNECTIONSTRING) {
    try {
      this.sequelize = new Sequelize(DB_CONNECTIONSTRING);

      /*
       *  Initializing all models from here
       * */
      this.models = Models(this.sequelize);
    } catch (e) {
      logger.log('error', 'Exception raised while connecting to database...', { detail: e.toString() });
    }
  }

  authenticate() {
    return this.sequelize.authenticate();
  }

  queryMethod(modelName, query) {
    const model = this.models[modelName];

    return this.sequelize.query(query, { model });
  }

  getSingleRow(modelName, args) {
    return this.models[modelName].findOne(args);
  }

  getMaxValue(modelName, attribute, query) {
    return this.models[modelName].max(attribute, query);
  }

  getAllRows(modelName, args) {
    return this.models[modelName].findAll(args);
  }

  create(modelName, query) {
    return this.models[modelName].create(query);
  }

  getRecordsCount(modelName) {
    return this.models[modelName].findAndCountAll();
  }
}

module.exports = Database;
