module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Supplier', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultNull: null,
      unique: true,
      field: 'Supplier'
    }
  }, {
    tableName: 'suppliers',
    timestamps: false,
    freezeTableName: true
  })
};
