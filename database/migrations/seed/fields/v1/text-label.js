const textLabel = {
  title: 'Text label',
  description: 'Defines the structure for text label field',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the field',
    },
    label: {
      type: 'string',
      description: 'Label of the field',
      maxLength: 255,
    },
    tooltip: {
      type: 'string',
      description: 'Help text for the field',
    },
  },
  required: [ 'name', 'label' ],
};

module.exports = {
  type: 'label',
  schema: {
    ...textLabel,
  },
};
