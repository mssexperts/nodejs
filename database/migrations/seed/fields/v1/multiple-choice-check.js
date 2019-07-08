const multipleChoiceCheckBox = {
  title: 'Multi choice check box',
  description: 'Defines the structure for multiple choice checkbox field',
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
    options: {
      type: 'array',
      description: 'Collection of options',
      items: {
        allOf: [ {
          $ref: '#/definitions/optionAttributes',
        } ],
      },
      minItems: 1,
      uniqueItems: true,
    },
    value: {
      type: 'array',
      description: 'Values of the field in array',
      items: {
        allOf: [ {
          $ref: '#/definitions/optionAttributes',
        } ],
      },
    },
    error: {
      type: 'string',
      description: 'Error message given by user',
      default: 'Atleast one choice has to be chosen',
      maxLength: 255,
    },
  },
  required: [ 'name', 'label', 'options' ],
  definitions: {
    optionAttributes: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'String for key',
        },
        value: {
          type: 'string',
          description: 'String for value',
        },
      },
      required: [ 'key', 'value' ],
    },
  },
};

module.exports = {
  type: 'multipleChoiceCheckBox',
  schema: {
    ...multipleChoiceCheckBox,
  },
};
