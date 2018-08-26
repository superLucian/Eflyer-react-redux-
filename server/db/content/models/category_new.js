module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductCategory', {
    partNum: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'partnum'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'newcategory'
    }
  }, {
    tableName: 'category_new',
    timestamps: false,
    freezeTableName: true
  });
};
