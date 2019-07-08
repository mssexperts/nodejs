const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Database = require('../../../database');
const [ , , email ] = require('../../../database/migrations/seed/fields/v1');

const { expect } = chai;

const db = new Database(process.env.DB_CONNECTIONSTRING);

chai.use(chaiHttp);

const CORERELATION_ID = 'dab45211-f134-428f-93f5-901d8d5770c8';
const TABLE_NAME = 'field';
const FIELD_DATA = [ {
  ...email,
  version: 1,
},
{
  ...email,
  version: 2,
} ];
const POST_DATA = { ...email };

describe('fields API', () => {
  before(async () => {
    await db.models[TABLE_NAME].destroy({ truncate: true });
    await db.models[TABLE_NAME].create(FIELD_DATA[0]);
    await db.models[TABLE_NAME].create(FIELD_DATA[1]);
  });

  context('GET /fields', () => {
    it('should return a success status i.e. HTTP 200', async () => {
      const { status } = await chai.request(server).get('/fields');

      expect(status)
        .to.equal(200);
    });

    it('should return a list of all fields data (collection of type, version, schema)', async () => {
      const { body } = await chai.request(server).get('/fields');

      const [ , data ] = FIELD_DATA;

      expect(body)
        .to.deep.equal([ data ]);
    });

    it('should return `x-coreplatform-paging-limit` in headers', async () => {
      const { header } = await chai.request(server).get('/fields');

      expect(header).to.contain.keys('x-coreplatform-paging-limit');
    });

    it('should return `x-coreplatform-total-records` in headers', async () => {
      const { header } = await chai.request(server).get('/fields');

      expect(header).to.contain.keys('x-coreplatform-total-records');
    });
  });

  context('GET /fields/:type', () => {
    it('should return a success status i.e. HTTP 200', async () => {
      const { status } = await chai.request(server).get('/fields/email');

      expect(status)
        .to.equal(200);
    });

    it('should return a field according to type with latest version (collection of type, version, schema)', async () => {
      const { body } = await chai.request(server).get('/fields/email');

      const [ , data ] = FIELD_DATA;

      expect(body)
        .to.deep.equal(data);
    });

    it('should return a field according to type and version (collection of type, version, schema)', async () => {
      const { body } = await chai.request(server).get('/fields/email?version=1');

      const [ data ] = FIELD_DATA;

      expect(body)
        .to.deep.equal(data);
    });

    it('should return a field according to type and version (collection of type, version, schema)', async () => {
      const { body } = await chai.request(server).get('/fields/email?version=2');

      const [ , data ] = FIELD_DATA;

      expect(body)
        .to.deep.equal(data);
    });

    /**
     * We have to wait for next release for chai to handle all response code
     * so that we can use all responses including errors without using try catch
     * */
    it('should return a not found status i.e. HTTP 404', async () => {
      try {
        await chai.request(server).get('/fields/email?version=10');
      } catch (e) {
        expect(e.status)
          .to.equal(404);
      }
    });
  });

  context('POST /fields', () => {
    before(async () => {
      await db.models[TABLE_NAME].destroy({ truncate: true });
    });

    it('should return a successfully created status i.e. HTTP 201', async () => {
      const { status } = await chai.request(server).post('/fields')
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_DATA);

      expect(status)
        .to.equal(201);
    });

    it('should return 201 status with empty response body', async () => {
      const { body } = await chai.request(server).post('/fields')
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_DATA);

      expect(body)
        .to.equals('');
    });

    it('should return the object with version 2', async () => {
      const { body } = await chai.request(server).get('/fields/email');

      const [ , data ] = FIELD_DATA;

      expect(body)
        .to.deep.equal(data);
    });

    it('should return body is not defined status i.e. HTTP 400', async () => {
      try {
        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID);
      } catch (error) {
        expect(error.response.status)
          .to.equal(400);
      }
    });

    it('should return response body having error message `Parameter: type in body must be required`', async () => {
      try {
        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({ schema: { ...email.schema } });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: type in body must be required' ],
              name: 'type',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: schema in body must be required`', async () => {
      try {
        const data = { type: 'email' };

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: schema in body must be required' ],
              name: 'schema',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: title in schema must be required`', async () => {
      try {
        const data = { type: 'email', schema: { ...email.schema } };

        delete data.schema.title;

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: title in schema must be required' ],
              name: 'title',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: description in schema must be required`', async () => {
      try {
        const data = { type: 'email', schema: { ...email.schema } };

        delete data.schema.description;

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: description in schema must be required' ],
              name: 'description',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: type in schema must be required`', async () => {
      try {
        const data = { type: 'email', schema: { ...email.schema } };

        delete data.schema.type;

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: type in schema must be required' ],
              name: 'type',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: properties in schema must be required`', async () => {
      try {
        const data = { type: 'email', schema: { ...email.schema } };

        delete data.schema.properties;

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: properties in schema must be required' ],
              name: 'properties',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: name in properties must be required`', async () => {
      try {
        const data = { type: 'email', schema: Object.assign({}, email.schema) };

        delete data.schema.properties.name;

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: name in properties must be required' ],
              name: 'name',
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: properties in schema must be an object`', async () => {
      try {
        const data = { type: 'email', schema: { ...email.schema } };

        data.schema.properties = [];

        await chai.request(server).post('/fields')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send(data);
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              messages: [ 'Parameter: properties in schema must be an object' ],
              name: 'schema.properties',
            } ],
          });
      }
    });
  });
});
