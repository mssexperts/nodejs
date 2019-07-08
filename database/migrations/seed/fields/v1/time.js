const time = {
  title: 'Time',
  description: 'Defines the structure for time field',
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
    tooltip: {
      type: 'string',
      description: 'Help text of the field',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder text of the field',
    },
    value: {
      type: 'string',
      description: 'Default value of the field',
    },
    format: {
      type: 'string',
      description: 'Format validation given by user',
      default: 'hh:mm am|pm',
    },
    error: {
      type: 'string',
      description: 'Error message given by user',
      default: 'Time entered is invalid',
      maxLength: 255,
    },
  },
  required: [ 'name', 'label' ],
};

module.exports = {
  type: 'time',
  schema: {
    ...time,
  },
};
