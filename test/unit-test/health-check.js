const chai = require('chai');
const HealthCheck = require('../../services/health-check');
const Database = require('../../database');
const config = require('../../config');

const { expect } = chai;

const database = new Database(config.DB_CONNECTIONSTRING);

const healthCheck = new HealthCheck(database);

describe('HealthCheck class', () => {
  describe('getDatabaseDetails method', () => {
    it('should exists inside HealthCheck class', () => {
      expect(healthCheck.getDatabaseDetails).to.be.exist;
    });

    it('should return success while connecting with database', async () => {
      const response = await healthCheck.getDatabaseDetails();

      expect(response).to.deep.equal({
        name: 'template-engine',
        type: 'database',
        status: 'success',
        version: '20180329132821-create-form.js',
      });
    });
  });
});
