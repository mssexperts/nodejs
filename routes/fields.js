const Fields = require('../controllers/fields');

class FieldsRoute {
  constructor(router, database) {
    this.router = router;
    this.fieldInstance = new Fields(database);
  }

  routes() {
    this.router.route('/fields/:type')
      .get((req, res) => this.fieldInstance.getByType(req, res));

    this.router.route('/fields')
      .get((req, res) => this.fieldInstance.getFields(req, res))
      .post((req, res) => this.fieldInstance.save(req, res));
  }
}

module.exports = FieldsRoute;
