const email = {
  title: 'Email',
  description: 'Defines the structure for email field',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the field',
    },
    label: {
      type: 'string',
      description: 'Label of the field',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder text of the field',
    },
    tooltip: {
      type: 'string',
      description: 'Help text for the field',
    },
    value: {
      type: 'string',
      description: 'Default value for the field',
    },
    format: {
      type: 'string',
      description: 'Format validation given by user',
      default: 'x@x.x',
    },
    error: {
      type: 'string',
      description: 'Error message given by user',
      default: 'Email entered is invalid',
      maxLength: 255,
    },
  },
  required: [ 'name', 'label' ],
};

module.exports = {
  type: 'email',
  schema: {
    ...email,
  },
};
