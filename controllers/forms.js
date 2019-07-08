const Services = require('../services');
const Validator = require('../utils/validator');
const { writeForm: writeFormSchema } = require('../dto-schemas');

class Forms {
  constructor(database) {
    this.services = new Services(database).register();
    this.validator = new Validator();
  }

  /**
   * Fetch all types of form templates with descending order by title
   * For getting tenancy form templates pass tenantid in header
   * @param {x-coreplatform-tenantid} - tenantid use to fetch form template for that tenancy
   * @return {array} - return form templates based on param
   * */
  async getForms(req, res) {
    const { headers, query } = req;
    const { 'x-coreplatform-tenantid': tenantId } = headers;
    const { pageNumber, pageSize } = query;
    const { forms } = this.services;

    try {
      const limit = this.validator.pageSize(pageSize);

      const offset = limit * (this.validator.pageNumber(pageNumber) - 1);

      const { count, response } = await forms.getForms({
        tenantId,
        limit,
        offset,
      });

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

  async getByPublicId(req, res) {
    const { forms } = this.services;

    try {
      const { publicId } = req.params;

      if (!this.validator.isValidUuid(publicId)) {
        return res.badRequest(
          'field-validation',
          [ {
            name: 'publicId',
            messages: [ 'Parameter: publicId in params must be valid' ],
          } ],
        );
      }

      const response = await forms.getByPublicId({ publicId });

      if (!response) {
        return res.notFound();
      }

      return res.status(200).json(response);
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
    const { body, headers } = req;
    const { 'x-coreplatform-tenantid': tenantId } = headers;
    const data = { ...body };
    const { forms } = this.services;

    try {
      const { errors } = this.validator.isSchemaValid({ schema: writeFormSchema, data });

      if (errors.length) {
        return res.badRequest('field-validation', errors);
      }

      const publicId = await forms.save({ tenant_id: tenantId, schema: data });

      const location = `${req.protocol}://${req.hostname}/forms/${publicId}`;

      res.setHeader('location', location);

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

module.exports = Forms;
