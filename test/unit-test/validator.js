const chai = require('chai');
const Validator = require('../../utils/validator');
const { DATA_RECORD_LIMIT } = require('../../config');
const { writeForm: writeFormSchema } = require('../../dto-schemas');

const validator = new Validator();
const FORM_REQUEST_DATA = {
  title: 'Email template',
  description: 'This template is used for email',
  fields: [ {
    type: 'single-line-text',
    version: 1,
    schema: {
      name: 'email',
      label: 'Email',
      placeholder: '',
      tooltip: '',
      value: '',
    },
  } ],
};

const { expect } = chai;

describe('Validator class', () => {
  describe('isValidUuid method', () => {
    it('should exists inside validator class', () => {
      expect(validator.isValidUuid).to.be.exist;
    });

    it('should return value equal to true', () => {
      const isValid = validator.isValidUuid('9498fd21-e175-401a-a143-914e2582f4f2');

      expect(isValid).equal(true);
    });

    it('should return value equal to false', () => {
      const isValid = validator.isValidUuid('aasdvgsgdgscvsgcgvscgv#@#$acaCDFDXACX');

      expect(isValid).equal(false);
    });
  });

  describe('isSchemaValid method', () => {
    it('should exists inside the validator class', () => {
      expect(validator.isSchemaValid).to.be.exist;
    });

    it('should validate the form request data', () => {
      const response = validator.isSchemaValid({
        schema: writeFormSchema,
        data: FORM_REQUEST_DATA,
      });

      expect(response).to.deep.equal({ errors: [] });
    });

    it('should not validate the data and return error', () => {
      const response = validator.isSchemaValid({
        schema: writeFormSchema,
        data: {
          description: 'This template is used for feedback',
          fields: [ {
            type: 'text',
            version: 1,
            schema: {
              label: 'Feedback',
              placeholder: 'Enter feedback',
              tooltip: 'Please enter your feedback here',
            },
          } ],
        },
      });

      expect(response).to.deep.equal({
        errors: [ {
          name: 'title',
          messages: [ 'Parameter: title in body must be required' ],
        } ],
      });
    });
  });

  describe('sanitizeStr method', () => {
    it('should exists inside the validator class', () => {
      expect(validator.sanitizeStr).to.be.exist;
    });

    it('should validate the form request data', () => {
      const response = validator.sanitizeStr(/[#'"/\\]/g, 'hello #"world"', '');

      expect(response).to.deep.equal('hello world');
    });
  });

  describe('removeDotAtFirst method', () => {
    it('should exists inside the validator class', () => {
      expect(validator.removeDotAtFirst).to.be.exist;
    });

    it('should validate the form request data', () => {
      const response = validator.removeDotAtFirst('.hello world');

      expect(response).to.deep.equal('hello world');
    });
  });

  describe('pageNumber method', () => {
    it('should exists inside the validator class', () => {
      expect(validator.pageNumber).to.be.exist;
    });

    it('should return 1 if the pageNumber is not a number', () => {
      const pageNumber = validator.pageNumber('a');

      expect(pageNumber).to.equal(1);
    });

    it('should return 1 if the pageNumber is equal to 1', () => {
      const pageNumber = validator.pageNumber('1');

      expect(pageNumber).to.equal(1);
    });

    it('should return 1 if the pageNumber is 0', () => {
      const pageNumber = validator.pageNumber(0);

      expect(pageNumber).to.equal(1);
    });

    it('should return 1 if the pageNumber is null', () => {
      const pageNumber = validator.pageNumber(null);

      expect(pageNumber).to.equal(1);
    });
  });

  describe('pageSize method', () => {
    it('should exists inside the validator class', () => {
      expect(validator.pageSize).to.be.exist;
    });

    it(`should return ${DATA_RECORD_LIMIT} if the pageSize is not a number`, () => {
      const pageSize = validator.pageSize('a');

      expect(pageSize).to.equal(DATA_RECORD_LIMIT);
    });

    it('should return 99 if the pageSize is equal to 99', () => {
      const pageSize = validator.pageSize('99');

      expect(pageSize).to.equal(99);
    });

    it(`should return ${DATA_RECORD_LIMIT} if the pageSize is 0`, () => {
      const pageSize = validator.pageSize(0);

      expect(pageSize).to.equal(DATA_RECORD_LIMIT);
    });

    it(`should return ${DATA_RECORD_LIMIT} if the pageSize is null`, () => {
      const pageSize = validator.pageSize(null);

      expect(pageSize).to.equal(DATA_RECORD_LIMIT);
    });

    it(`should return ${DATA_RECORD_LIMIT} if the pageSize is negative number`, () => {
      const pageSize = validator.pageSize(-1);

      expect(pageSize).to.equal(DATA_RECORD_LIMIT);
    });

    it(`should return ${DATA_RECORD_LIMIT} if the pageSize is greater than DATA_RECORD_LIMIT`, () => {
      const pageSize = validator.pageSize(500);

      expect(pageSize).to.equal(DATA_RECORD_LIMIT);
    });
  });
});
