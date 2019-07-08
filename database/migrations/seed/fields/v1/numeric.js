const numeric = {
  title: 'Numeric',
  description: 'Defines the structure for numeric field',
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
      description: 'Help text of the field',
      type: 'string',
    },
    value: {
      type: 'number',
      description: 'Default value of the field',
    },
    error: {
      type: 'string',
      description: 'Invalid numeric value',
      default: 'Invalid numeric value',
      maxLength: 255,
    },
  },
  required: [ 'name', 'label' ],
};

module.exports = {
  type: 'numeric',
  schema: {
    ...numeric,
  },
};
