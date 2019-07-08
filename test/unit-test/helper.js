const chai = require('chai');
const Helper = require('../../utils/helper');

const dataSnakeCase = { first_name: 'abc', last_name: 'xyz' };
const dataCamelCase = { firstName: 'abc', lastName: 'xyz' };
const helper = new Helper();

const { expect } = chai;

describe('Helper class', () => {
  describe('convertCamelToSnake method', () => {
    it('should exists inside Helper class', () => {
      expect(helper.convertCamelToSnake).to.be.exist;
    });

    it('should convert camel case string into snake case', () => {
      const convertedStr = helper.convertCamelToSnake('firstName');

      expect(convertedStr).equal('first_name');
    });

    it('should return object having keys in snake case', () => {
      const convertedObj = helper.convertCamelToSnake(dataCamelCase);

      expect(convertedObj).to.deep.equal(dataSnakeCase);
    });
  });

  describe('convertCamelObjectToSnake method', () => {
    it('should exists inside Helper class', () => {
      expect(helper.convertCamelObjectToSnake).to.be.exist;
    });

    it('should return object having keys in snake case', () => {
      const convertedObj = helper.convertCamelObjectToSnake(dataCamelCase);

      expect(convertedObj).to.deep.equal(dataSnakeCase);
    });
  });

  describe('convertSnakeToCamel method', () => {
    it('should exists inside the Helper class', () => {
      expect(helper.convertSnakeToCamel).to.be.exist;
    });

    it('should convert snake case string into camel case', () => {
      const convertedStr = helper.convertSnakeToCamel('first_name');

      expect(convertedStr).equal('firstName');
    });

    it('should return object having keys in camel case', () => {
      const convertedObj = helper.convertSnakeToCamel(dataSnakeCase);

      expect(convertedObj).to.deep.equal(dataCamelCase);
    });
  });

  describe('convertSnakeObjectToCamel method', () => {
    it('should exists inside the Helper class', () => {
      expect(helper.convertSnakeObjectToCamel).to.be.exist;
    });

    it('should return object having keys in camel case', () => {
      const convertedObj = helper.convertSnakeObjectToCamel(dataSnakeCase);

      expect(convertedObj).to.deep.equal(dataCamelCase);
    });
  });
});
