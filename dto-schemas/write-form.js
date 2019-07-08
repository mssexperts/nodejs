const form = {
  title: 'Write form template schema',
  description: 'Defines the structure for the form template for post endpoint',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'title of the form',
    },
    fields: {
      type: 'array',
      description: 'Collection of fields',
      items: {
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: 'Type of the field',
            },
            version: {
              type: 'integer',
              description: 'version of the field',
            },
            schema: {
              type: 'object',
              description: 'Schema of the field',
            },
          },
          errorMessage: {
            type: 'should be an object',
            required: {
              type: 'Parameter: type in field must be required',
              version: 'Parameter: version in field must be required',
              schema: 'Parameter: schema in field must be required',
            },
            properties: {
              schema: 'Parameter: schema in field must be an object',
            },
          },
          required: [
            'type',
            'version',
            'schema',
          ],
        },
      },
      minItems: 1,
    },
  },
  errorMessage: {
    type: 'should be an object',
    required: {
      title: 'Parameter: title in body must be required',
      fields: 'Parameter: fields in body must be required',
    },
    properties: {
      fields: 'Parameter: fields in body must be an array and should have minimum one object value',
    },
  },
  required: [ 'title', 'fields' ],
};

module.exports = form;
