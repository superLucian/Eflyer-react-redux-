module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
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
      field: 'Member'
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Country'
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'website'
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Industry'
    }
  }, {
    tableName: 'members',
    timestamps: false,
    freezeTableName: true
  })
};
