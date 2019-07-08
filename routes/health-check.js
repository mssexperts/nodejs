const HealthCheck = require('../controllers/health-check');

class HealthCheckRoute {
  constructor(router, database) {
    this.router = router;
    this.healthCheckInstance = new HealthCheck(database);
  }

  routes() {
    this.router.route('/healthcheck')
      .get((req, res) => this.healthCheckInstance.authenticate(req, res));
  }
}

module.exports = HealthCheckRoute;
