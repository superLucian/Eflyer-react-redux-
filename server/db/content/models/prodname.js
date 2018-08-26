module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductName', {
    partNum: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'partnum'
    },
    prodName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'prodname'
    }
  }, {
    tableName: 'prodname',
    timestamps: false,
    freezeTableName: true
  });
};
