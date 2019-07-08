module.exports = (sequelize, DataTypes) => {
  const form = sequelize.define(
    'form',
    {
      tenant_id: DataTypes.UUID,
      public_id: DataTypes.UUID,
      schema: DataTypes.JSON,
    },
    {
      freezeTableName: true,
      underscored: true,
    },
  );

  return form;
};
