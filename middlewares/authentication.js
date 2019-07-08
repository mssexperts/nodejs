class Authentication {
  constructor(logger) {
    logger.log('Sucess', 'Authentication initiated');
  }

  register(req, res, next) {
    this.data = 'Need to configure';
    next();
  }
}

module.exports = Authentication;
