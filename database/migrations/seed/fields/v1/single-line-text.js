const singleLineText = {
  title: 'Single line text',
  description: 'Defines the structure for text field',
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
      description: 'Help text of the field',
    },
    value: {
      type: 'string',
      description: 'Default value of the field',
    },
    error: {
      type: 'string',
      description: 'Error message given by user',
      default: 'Text entered is invalid',
      maxLength: 255,
    },
  },
  required: [ 'name', 'label' ],
};

module.exports = {
  type: 'singleLineText',
  schema: {
    ...singleLineText,
  },
};
