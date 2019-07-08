module.exports = (sequelize, DataTypes) => {
  const field = sequelize.define(
    'field',
    {
      type: DataTypes.STRING,
      version: DataTypes.INTEGER,
      schema: DataTypes.JSON,
    },
    {
      freezeTableName: true,
      underscored: true,
    },
  );

  return field;
};
