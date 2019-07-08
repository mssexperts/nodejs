class AccessManagement {
  constructor(logger) {
    logger.log('Sucess', 'AccessManagement initiated');
  }

  register(req, res, next) {
    this.data = 'Need to configure';
    next();
  }
}

module.exports = AccessManagement;
