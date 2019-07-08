const Services = require('../services');
const {
  URL_IDENTITY_SERVICE,
  URL_TENANCY_SERVICE,
  VERSION,
} = require('../config');

class HealthCheck {
  constructor(database) {
    this.services = new Services(database).register();
  }

  /**
   * Authenticate method to test database connectivity
   * @return {json} status - 200
   * @return {json} msg - description for testing the database connection and down stream services.
   * */
  async authenticate(req, res) {
    const response = [];

    const checkDbConnection = await this.services.healthCheck.getDatabaseDetails();

    response.push(checkDbConnection);

    const idsServicePingStatus = await this.services.healthCheck.checkStatus(`${URL_IDENTITY_SERVICE}/ping`);

    response.push(idsServicePingStatus);

    const tenancyServicePingStatus = await this.services.healthCheck.checkStatus(`${URL_TENANCY_SERVICE}/ping`);

    response.push(tenancyServicePingStatus);

    return res.status(200).send({
      version: `${VERSION}`,
      dependsOn: response,
    });
  }
}

module.exports = HealthCheck;
