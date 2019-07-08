module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('form', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    public_id: {
      type: Sequelize.UUID,
    },
    tenant_id: {
      type: Sequelize.UUID,
    },
    schema: {
      type: Sequelize.JSON,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('form'),
};
