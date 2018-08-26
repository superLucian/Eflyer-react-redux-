module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductDescription', {
    partNum: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'partnum'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description'
    }
  }, {
    tableName: 'description',
    timestamps: false,
    freezeTableName: true
  });
};
