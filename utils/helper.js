/* eslint class-methods-use-this: ["error", { "exceptMethods": ["convertCamelObjectToSnake","convertSnakeObjectToCamel"] }] */

const convertCamelCase = require('lodash.camelcase');
const convertSnakeCase = require('lodash.snakecase');

class Helper {
  convertCamelToSnake(payload) {
    const payloadDataType = typeof payload;

    switch (payloadDataType) {
      case 'string':
        return convertSnakeCase(payload);

      case 'object':
        return this.convertCamelObjectToSnake(payload);

      default:
        return payload;
    }
  }

  convertCamelObjectToSnake(payload) {
    const obj = { ...payload };
    const response = {};
    const objectkeys = Object.keys(obj);

    objectkeys.map((key) => {
      const convertedKey = convertSnakeCase(key);

      response[convertedKey] = obj[key];

      return true;
    });

    return response;
  }

  convertSnakeToCamel(payload) {
    const payloadDataType = typeof payload;

    switch (payloadDataType) {
      case 'string':
        return convertCamelCase(payload);

      case 'object':
        return this.convertSnakeObjectToCamel(payload);

      default:
        return payload;
    }
  }

  convertSnakeObjectToCamel(payload) {
    const obj = { ...payload };
    const response = {};
    const objectkeys = Object.keys(obj);

    objectkeys.map((key) => {
      const convertedKey = convertCamelCase(key);

      response[convertedKey] = obj[key];

      return true;
    });

    return response;
  }
}

module.exports = Helper;
