const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Database = require('../../../database');
const { DATA_RECORD_LIMIT } = require('../../../config');

require('it-each')({ testPerIteration: true });

const { expect } = chai;
const db = new Database(process.env.DB_CONNECTIONSTRING);

chai.use(chaiHttp);

const TABLE_NAME = 'form';
const CORERELATION_ID = 'dab45211-f134-428f-93f5-901d8d5770c8';
const TENANT_ID = 'a1ecc309-2b7b-4540-aaf9-7196d290f670';
const FORM_PUBLIC_ID = '4bed8d80-33e6-4a4d-88ef-9ec24b89a58c';
const ASSIGN_FORM_PUBLIC_ID = '7e544a79-88bd-42d4-b77d-e76f70bc4a29';
const POST_BODY = {
  title: 'Email template',
  description: 'This template is used for email',
  fields: [ {
    type: 'email',
    version: 1,
    schema: {
      label: 'email',
      placeholder: 'Enter email',
      tooltip: 'Please enter your email here',
    },
  } ],
};

const pageSizeCombinations = [
  {
    pageSize: 99,
    expectedPageSize: '99',
  },
  {
    pageSize: 100,
    expectedPageSize: '100',
  },
  {
    pageSize: 500,
    expectedPageSize: DATA_RECORD_LIMIT.toString(),
  },
  {
    pageSize: -1,
    expectedPageSize: DATA_RECORD_LIMIT.toString(),
  },
  {
    pageSize: 0,
    expectedPageSize: DATA_RECORD_LIMIT.toString(),
  },
  {
    pageSize: null,
    expectedPageSize: DATA_RECORD_LIMIT.toString(),
  },
];

const pageNumberCombinations = [
  {
    pageSize: 99,
    pageNumber: 1,
    expectedForms: '99',
  },
  {
    pageSize: 100,
    pageNumber: 1,
    expectedForms: '100',
  },
  {
    pageSize: 500,
    pageNumber: 1,
    expectedForms: DATA_RECORD_LIMIT.toString(),
  },
  {
    pageSize: -1,
    pageNumber: 1,
    expectedForms: DATA_RECORD_LIMIT.toString(),
  },
  {
    pageSize: 0,
    pageNumber: 1,
    expectedForms: DATA_RECORD_LIMIT.toString(),
  },
  {
    pageSize: null,
    pageNumber: 1,
    expectedForms: DATA_RECORD_LIMIT.toString(),
  },
];

describe('Forms API', () => {
  beforeEach(async () => {
    await db.models[TABLE_NAME].destroy({ truncate: true });
  });

  context('GET /forms', () => {
    const FORM_BODY = {
      public_id: FORM_PUBLIC_ID,
      schema: { ...POST_BODY },
    };
    const ASSIGN_FORM_BODY_TENANT = {
      tenant_id: TENANT_ID,
      public_id: ASSIGN_FORM_PUBLIC_ID,
      schema: { ...POST_BODY },
    };

    beforeEach(async () => {
      await db.models[TABLE_NAME].create(FORM_BODY);
      await db.models[TABLE_NAME].create(ASSIGN_FORM_BODY_TENANT);
    });

    it('should return a success status i.e. HTTP 200 having tenantid in header', async () => {
      const { status } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      expect(status)
        .to.equal(200);
    });

    it('should return a response body to be an array of form templates for given tenantid in header', async () => {
      const { body } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      expect(body).to.be.an('array');
    });

    it('should return `x-coreplatform-paging-limit` in headers', async () => {
      const { header } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      expect(header).to.contain.keys('x-coreplatform-paging-limit');
    });

    it('should return `x-coreplatform-total-records` in headers', async () => {
      const { header } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      expect(header).to.contain.keys('x-coreplatform-total-records');
    });

    it('should return a response body has data and contains an array of object containing (schema, publicId, tenantId)', async () => {
      const { body } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      const [ data ] = body;

      expect(data)
        .to.contain.keys('schema', 'publicId', 'tenantId');
    });

    it('should return a response body contains an array of (schema, publicId, tenantId)', async () => {
      const { body } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      const [ data ] = body;

      expect([ data ])
        .to.deep.equal([ {
          publicId: ASSIGN_FORM_PUBLIC_ID,
          tenantId: TENANT_ID,
          schema: { ...POST_BODY },
        } ]);
    });

    it('should return a success status i.e. HTTP 200', async () => {
      const { status } = await chai.request(server).get('/forms');

      expect(status)
        .to.equal(200);
    });

    it('should return a response body to be an array', async () => {
      const { body } = await chai.request(server).get('/forms');

      expect(body).to.be.an('array');
    });

    it('should return a response body containing an array of (schema, publicId, tenantId)', async () => {
      const { body } = await chai.request(server).get('/forms');

      const [ data ] = body;

      expect(data)
        .to.contain.keys('schema', 'publicId', 'tenantId');
    });

    it('should return a response body contains an array of (schema, publicId, tenantId)', async () => {
      const { body } = await chai.request(server).get('/forms');

      const [ data ] = body;

      expect([ data ])
        .to.deep.equal([ {
          publicId: FORM_PUBLIC_ID,
          tenantId: null,
          schema: { ...POST_BODY },
        } ]);
    });

    it('should return empty array when no record exists', async () => {
      await db.models[TABLE_NAME].destroy({ truncate: true });

      const { body } = await chai.request(server).get('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID);

      expect(body).to.be.empty;
    });
  });

  context('GET /forms/:publicId', () => {
    const FORM_DATA = {
      public_id: FORM_PUBLIC_ID,
      schema: { ...POST_BODY },
    };

    beforeEach(async () => {
      await db.models[TABLE_NAME].create(FORM_DATA);
    });

    it('should return a success status i.e. HTTP 200', async () => {
      const { status } = await chai.request(server).get(`/forms/${FORM_PUBLIC_ID}`);

      expect(status)
        .to.equal(200);
    });

    it('should return a response body containing object', async () => {
      const { body } = await chai.request(server).get(`/forms/${FORM_PUBLIC_ID}`);

      expect(body).to.be.an('object');
    });

    it('should return a response body containing an object of (schema, publicId, tenantId)', async () => {
      const { body } = await chai.request(server).get(`/forms/${FORM_PUBLIC_ID}`);

      expect(body)
        .to.contain.keys('schema', 'publicId', 'tenantId');
    });

    it('should return a response body containing an object of (schema, publicId, tenantId)', async () => {
      const { body } = await chai.request(server).get(`/forms/${FORM_PUBLIC_ID}`);

      expect(body)
        .to.deep.equal({
          publicId: '4bed8d80-33e6-4a4d-88ef-9ec24b89a58c',
          tenantId: null,
          schema: { ...POST_BODY },
        });
    });

    it('should return 404 status if form template not found', async () => {
      try {
        await chai.request(server).post('/forms/4bed8d80-33q6-4a4d-88ef-9ec24b89aa8c');
      } catch (error) {
        expect(error.response.status)
          .to.equal(404);
      }
    });
  });

  context('POST /forms', () => {
    it('should return a successfully created status when creating a template for tenancy i.e. HTTP 201', async () => {
      const { status } = await chai.request(server).post('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID)
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_BODY);

      expect(status)
        .to.equal(201);
    });

    it('should return empty response body when creating a template for tenancy', async () => {
      const { body } = await chai.request(server).post('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID)
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_BODY);

      expect(body)
        .to.equals('');
    });

    it('should return a successfully 201 status when creating default templates i.e. HTTP 201', async () => {
      const { status } = await chai.request(server).post('/forms')
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_BODY);

      expect(status)
        .to.equal(201);
    });

    it('should return empty response body', async () => {
      const { body } = await chai.request(server).post('/forms')
        .set('x-coreplatform-tenantid', TENANT_ID)
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_BODY);

      expect(body)
        .to.equals('');
    });

    it('should return location in header', async () => {
      const { header } = await chai.request(server).post('/forms')
        .set('x-coreplatform-correlationid', CORERELATION_ID)
        .send(POST_BODY);

      expect(header)
        .to.contain.keys('location');
    });

    it('should return response status 400', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID);
      } catch (error) {
        expect(error.response.status)
          .to.equal(400);
      }
    });

    it('should return response body having error message `Parameter: title in body must be required`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            description: 'This template is used for email',
            fields: [ {
              type: 'email',
              version: 1,
              schema: {
                label: 'email',
                placeholder: 'Enter email',
                tooltip: 'Please enter your email here',
              },
            } ],
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'title',
              messages: [ 'Parameter: title in body must be required' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: fields in body must be required`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            description: 'This template is used for email',
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields',
              messages: [ 'Parameter: fields in body must be required' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: fields in body must be an array and should have minimum one object value`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            fields: {},
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields',
              messages: [ 'Parameter: fields in body must be an array and should have minimum one object value' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: fields in body must be an array and should have minimum one object value`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            fields: [],
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields',
              messages: [ 'Parameter: fields in body must be an array and should have minimum one object value' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: type in field must be required`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            description: 'This template is used for email',
            fields: [ {
              version: 1,
              schema: {
                label: 'email',
                placeholder: 'Enter email',
                tooltip: 'Please enter your email here',
              },
            } ],
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields.',
              messages: [ 'Parameter: type in field must be required' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: version in field must be required`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            description: 'This template is used for email',
            fields: [ {
              type: 'email',
              schema: {
                label: 'email',
                placeholder: 'Enter email',
                tooltip: 'Please enter your email here',
              },
            } ],
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields.',
              messages: [ 'Parameter: version in field must be required' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: schema in field must be required`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            description: 'This template is used for email',
            fields: [ {
              type: 'email',
              version: 1,
            } ],
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields.',
              messages: [ 'Parameter: schema in field must be required' ],
            } ],
          });
      }
    });

    it('should return response body having error message `Parameter: schema in field must be an object`', async () => {
      try {
        await chai.request(server).post('/forms')
          .set('x-coreplatform-correlationid', CORERELATION_ID)
          .send({
            title: 'Email template',
            description: 'This template is used for email',
            fields: [ {
              type: 'email',
              version: 1,
              schema: [],
            } ],
          });
      } catch (error) {
        expect(error.response.body)
          .to.deep.equal({
            type: 'field-validation',
            details: [ {
              name: 'fields.',
              messages: [ 'Parameter: schema in field must be an object' ],
            } ],
          });
      }
    });
  });
});

describe('Forms Pagination API', () => {
  before(async () => {
    const ASSIGN_FORM_BODY_TENANT = {
      tenant_id: TENANT_ID,
      public_id: ASSIGN_FORM_PUBLIC_ID,
      schema: { ...POST_BODY },
    };

    await db.models[TABLE_NAME].destroy({ truncate: true });

    let i = 0;
    const createRecords = async () => {
      await db.models[TABLE_NAME].create(ASSIGN_FORM_BODY_TENANT);
    };

    while (i <= 500) {
      createRecords();

      i += 1;
    }
  });

  it.each(
    pageSizeCombinations,
    'should return `x-coreplatform-paging-limit` value of "%s" in headers if pageSize="%s"',
    [ 'element.expectedPageSize', 'element.pageSize' ],
    async (element, next) => {
      const { header } = await chai.request(server).get(`/forms?pageSize=${element.pageSize}`)
        .set('x-coreplatform-tenantid', TENANT_ID);

      const { 'x-coreplatform-paging-limit': pageSize } = header;

      expect(pageSize).to.equal(element.expectedPageSize);

      next();
    },
  );

  it.each(
    pageNumberCombinations,
    'should return `x-coreplatform-paging-limit` value of "%s" in headers if pageSize="%s" & pageNumber="%s"',
    [ 'element.expectedPageSize', 'element.pageSize', 'element.pageNumber' ],
    async (element, next) => {
      const { body } = await chai.request(server).get(`/forms?pageSize=${element.pageSize}&pageNumber=${element.pageNumber}`)
        .set('x-coreplatform-tenantid', TENANT_ID);

      expect(body.length.toString()).to.equal(element.expectedForms);

      next();
    },
  );
});
