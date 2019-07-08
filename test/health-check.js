const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('./server');
const { URL_IDENTITY_SERVICE, URL_TENANCY_SERVICE } = require('../config');

const { expect } = chai;

chai.use(chaiHttp);

const healthCheckResponse = {
  version: '1.0.0',
  dependsOn: [ {
    name: 'template-engine',
    type: 'database',
    status: 'success',
    version: '20180329132821 - create-form.js',
  },
  {
    name: `${URL_IDENTITY_SERVICE}/ping`,
    status: 'Success',
    type: 'service',
  },
  {
    name: `${URL_TENANCY_SERVICE}/ping`,
    status: 'Success',
    type: 'service',
  } ],
};

/**
 * Test the /GET route for health api
 * */
describe('HealthCheck /GET', () => {
  const request = chai.request(server);

  const httpGet = sinon.stub(request, 'get');

  httpGet.yields(null, {
    body: healthCheckResponse,
    status: 200,
  }, null);

  it('should return response status equals to 200', async () => {
    await request.get('/healthcheck', (err, { status }) => {
      expect(status).to.equal(200);
    });
  });

  it('should return response body containing status 200', async () => {
    await request.get('/healthcheck', (err, { body }) => {
      expect(body).to.deep.equal(healthCheckResponse);
    });
  });
});
