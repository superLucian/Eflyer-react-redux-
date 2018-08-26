module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductPrice', {
    partNum: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'partnum'
    },
    msrp: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'msrp'
    }
  }, {
    tableName: 'msrp',
    timestamps: false,
    freezeTableName: true
  });
};
