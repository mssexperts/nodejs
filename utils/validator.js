/* eslint class-methods-use-this: ["error", { "exceptMethods": [ "pageNumber", "pageSize" ] }] */

const Ajv = require('ajv');
const { DATA_RECORD_LIMIT } = require('../config');

const ajv = new Ajv({ allErrors: true, jsonPointers: true });

require('ajv-errors')(ajv, { singleError: false });

class Validator {
  isValidUuid(uuid) {
    /**
     * The Following RegExp Expression is used to ensure provided public-id is valid uuid
     * Please refers the following link for better understanding.
     * link:- https://www.npmjs.com/package/is-uuid
     * https://github.com/afram/is-uuid
     * https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
     */
    this.uuid = uuid;
    const expression = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (expression.test(this.uuid)) {
      return true;
    }

    return false;
  }

  isSchemaValid({ schema, data }) {
    const validator = ajv.compile(schema);
    const isValid = validator(data);
    const errors = [];

    if (!isValid) {
      validator.errors.forEach((error) => {
        const {
          message,
          dataPath,
          params: { errors: paramErrors },
        } = error;
        let errorDetails;

        let { params: { missingProperty: name } } = paramErrors[0];

        if (name) {
          errorDetails = {
            name,
            messages: [ message ],
          };
        } else {
          name = this.removeCharAtFirst(dataPath);

          name = this.sanitizeStr(/[#_.'"/\\]/g, name, '.');

          errorDetails = {
            name,
            messages: [ message ],
          };
        }

        errors.push(errorDetails);
      });

      return { errors };
    }

    return { errors: [] };
  }

  removeCharAtFirst(str) {
    this.str = str.slice(1);

    return this.str;
  }

  removeDotAtFirst(str) {
    this.str = str.slice(1);

    return this.str;
  }

  sanitizeStr(regex, str, data) {
    this.str = str.replace(regex, data);

    return this.str;
  }

  pageNumber(pageNumber) {
    try {
      return parseInt(pageNumber, 10) || 1;
    } catch (e) {
      // will return the default pageNumber if given pageNumber is invalid
      return 1;
    }
  }

  pageSize(pageSize) {
    try {
      let pageLimit = parseInt(pageSize, 10) || DATA_RECORD_LIMIT;

      if (!(pageLimit > 0 && pageLimit < DATA_RECORD_LIMIT)) {
        pageLimit = DATA_RECORD_LIMIT;
      }

      return pageLimit;
    } catch (e) {
      // will return the default pageNumber if given pageNumber is invalid
      return DATA_RECORD_LIMIT;
    }
  }
}

module.exports = Validator;
