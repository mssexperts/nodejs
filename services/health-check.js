/* eslint class-methods-use-this: ["error", { "exceptMethods": ["checkStatus"] }] */

const axios = require('axios');

class HealthCheck {
  constructor(database) {
    this.database = database;
  }

  async checkStatus(url) {
    try {
      await axios(url);

      return ({
        name: url,
        type: 'service',
        status: 'success',
      });
    } catch (error) {
      return ({
        name: url,
        type: 'service',
        status: 'failure',
      });
    }
  }

  async getDatabaseDetails() {
    let version = '0';

    try {
      await this.database.authenticate();

      const data = await this.database.getSingleRow(
        'SequelizeMeta',
        {
          attributes: [ 'name' ],
          order: [ [ 'name', 'DESC' ] ],
        },
      );

      if (data) {
        const { dataValues: { name } } = data;

        version = name;
      }

      return ({
        name: 'template-engine',
        type: 'database',
        status: 'success',
        version,
      });
    } catch (error) {
      return ({
        name: 'template-engine',
        type: 'database',
        status: 'failure',
        version,
      });
    }
  }
}

module.exports = HealthCheck;
