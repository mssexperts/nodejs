const Ping = require('./ping');
const HealthCheck = require('./health-check');
const Fields = require('./fields');
const Forms = require('./forms');

class Route {
  constructor(router, database) {
    this.router = router;
    this.database = database;
  }

  register() {
    new Ping(this.router).routes();
    new HealthCheck(this.router, this.database).routes();
    new Fields(this.router, this.database).routes();
    new Forms(this.router, this.database).routes();

    return this.router;
  }
}

module.exports = Route;
