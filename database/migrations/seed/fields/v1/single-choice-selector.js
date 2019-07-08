const singleChoiceSelectorBox = {
  title: 'Single choice selector box',
  description: 'Defines the structure for single choice radio button field',
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
      $ref: '#/definitions/optionAttributes',
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
        error: {
          type: 'string',
          description: 'Error message given by user',
          default: 'At the least one item have to be chosen',
          maxLength: 255,
        },
      },
      required: [ 'key', 'value' ],
    },
  },
};

module.exports = {
  type: 'singleChoiceSelector',
  schema: {
    ...singleChoiceSelectorBox,
  },
};
