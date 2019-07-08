const HealthCheck = require('./health-check');
const Fields = require('./fields');
const Forms = require('./forms');

class Services {
  constructor(database) {
    this.database = database;
  }

  register() {
    return {
      healthCheck: new HealthCheck(this.database),
      fields: new Fields(this.database),
      forms: new Forms(this.database),
    };
  }
}

module.exports = Services;
