const Forms = require('../controllers/forms');

class FormsRoute {
  constructor(router, database) {
    this.router = router;
    this.formInstance = new Forms(database);
  }

  routes() {
    this.router.route('/forms/:publicId')
      .get((req, res) => this.formInstance.getByPublicId(req, res));

    this.router.route('/forms')
      .post((req, res) => this.formInstance.save(req, res))
      .get((req, res) => this.formInstance.getForms(req, res));
  }
}

module.exports = FormsRoute;
