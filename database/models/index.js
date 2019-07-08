/**
 * Initializing the sequelize-cli init command
 * (http://docs.sequelizejs.com/manual/tutorial/migrations.html#bootstrapping)
 * */
const fs = require('fs');
const path = require('path');
const logger = require('../../config/logger');

const basename = path.basename(__filename);
const db = {};

const models = (sequelize) => {
  fs
    .readdirSync(__dirname)
    .filter((file) => ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')))
    .forEach((file) => {
      try {
        const model = sequelize.import(path.join(__dirname, file));

        db[model.name] = model;
      } catch (e) {
        logger.log('error', 'The exception is as follows', { detail: e.toString() });
      }
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};

module.exports = models;
