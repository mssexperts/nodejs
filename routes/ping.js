const Ping = require('../controllers/ping');

class PingRoute {
  constructor(router) {
    this.router = router;
    this.pingInstance = new Ping();
  }

  routes() {
    this.router.route('/ping')
      .get((req, res) => this.pingInstance.status(req, res));
  }
}

module.exports = PingRoute;
