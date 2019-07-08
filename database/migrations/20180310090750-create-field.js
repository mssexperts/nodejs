module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('field', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    version: {
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('field'),
};
