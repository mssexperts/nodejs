const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

const { expect } = chai;

chai.use(chaiHttp);

/**
 * Test the /GET route
 * */
describe('Ping /GET', () => {
  it('should return response status equals to 200', async () => {
    const { status } = await chai.request(server).get('/ping');

    expect(status).to.deep.equal(200);
  });

  it('should return response body containing status `ok`', async () => {
    const { body } = await chai.request(server).get('/ping');

    expect(body).to.deep.equal({ status: 'ok' });
  });
});
