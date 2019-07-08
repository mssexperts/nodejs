class Authorization {
  constructor(logger) {
    logger.log('Sucess', 'Authorization initiated');
  }

  register(req, res, next) {
    this.data = 'Need to configure';
    next();
  }
}

module.exports = Authorization;
