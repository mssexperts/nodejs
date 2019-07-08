const Services = require('../services');
const Validator = require('../utils/validator');
const { writeField: writeFieldSchema } = require('../dto-schemas');

class Fields {
  constructor(database) {
    this.services = new Services(database).register();
    this.validator = new Validator();
  }

  /**
   * get method to fetch all types of fields with latest version from database
   * @return {array} - returns array of all type of fields
   * */
  async getFields(req, res) {
    const { query } = req;
    const { pageNumber, pageSize } = query;
    const { fields } = this.services;

    try {
      const limit = this.validator.pageSize(pageSize);

      const offset = limit * (this.validator.pageNumber(pageNumber) - 1);

      const { count, response } = await fields.getFields({ limit, offset });

      res.setHeader('x-coreplatform-paging-limit', limit);
      res.setHeader('x-coreplatform-total-records', count);

      return res.status(200).json(response);
    } catch (err) {
      return res.serverError([
        {
          name: 'unexpected-server-error',
          messages: [ 'Please contact administrator and present correlation identifier for troubleshooting' ],
        },
      ]);
    }
  }

  /**
   * getByType method to fetch a field according to type and version. If there is no version defined then latest version will be fetched.
   * @param {type} - fields according to type
   * @query {version} - version for the field
   * @return {object} - returns object for that particular field.
   * */
  async getByType(req, res) {
    const { fields } = this.services;

    try {
      const { type } = req.params;
      const { version } = req.query;
      const fieldResponse = await fields.getFieldsByType({ type, version });

      if (fieldResponse) {
        return res.status(200).json(fieldResponse);
      }

      return res.status(404).json();
    } catch (error) {
      return res.serverError([
        {
          name: 'unexpected-server-error',
          messages: [ 'Please contact administrator and present correlation identifier for troubleshooting' ],
        },
      ]);
    }
  }

  async save(req, res) {
    const { fields } = this.services;

    try {
      const { body } = req;
      const data = { ...body };

      const { errors } = this.validator.isSchemaValid({ schema: writeFieldSchema, data });

      if (errors.length) {
        return res.badRequest('field-validation', errors);
      }

      await fields.save(data);

      return res.status(201).json();
    } catch (error) {
      return res.serverError([
        {
          name: 'unexpected-server-error',
          messages: [ 'Please contact administrator and present correlation identifier for troubleshooting' ],
        },
      ]);
    }
  }
}

module.exports = Fields;
