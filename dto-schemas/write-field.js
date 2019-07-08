const field = {
  title: 'Field HTTP POST schema',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    type: {
      type: 'string',
      description: 'Type of the field template',
    },
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the field schema',
        },
        type: {
          type: 'string',
          description: 'Type of the field schema',
          default: 'object',
        },
        description: {
          type: 'string',
          description: 'Description of the field schema',
        },
        properties: {
          type: 'object',
          description: 'Properties of the field schema',
          properties: {
            name: {
              type: 'object',
              description: 'Name of the field',
            },
            label: {
              type: 'object',
              description: 'Label of the field',
            },
          },
          errorMessage: {
            required: {
              name: 'Parameter: name in properties must be required',
              label: 'Parameter: label in properties must be required',
            },
          },
          required: [ 'name', 'label' ],
        },
      },
      errorMessage: {
        required: {
          title: 'Parameter: title in schema must be required',
          description: 'Parameter: description in schema must be required',
          type: 'Parameter: type in schema must be required',
          properties: 'Parameter: properties in schema must be required',
        },
        properties: {
          properties: 'Parameter: properties in schema must be an object',
        },
      },
      required: [
        'title',
        'description',
        'type',
        'properties',
      ],
    },
  },
  errorMessage: {
    required: {
      type: 'Parameter: type in body must be required',
      schema: 'Parameter: schema in body must be required',
    },
    properties: {
      schema: 'Parameter: schema in body must be an object',
    },
  },
  required: [ 'type', 'schema' ],
};

module.exports = field;
