module.exports = (sequelize, DataTypes) => {
  const form = sequelize.define(
    'SequelizeMeta',
    {
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
    },
  );

  return form;
};
