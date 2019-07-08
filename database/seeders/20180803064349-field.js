const fields = require('../migrations/seed/fields/v1');

const updateSeedDate = (fieldsArray) => fieldsArray.map((field) => ({
  ...field,
  version: 1,
  schema: JSON.stringify(field.schema),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('field', updateSeedDate(fields), {}),
  down: (queryInterface) => queryInterface.bulkDelete('field', JSON.stringify(updateSeedDate(fields)), {}),
};
