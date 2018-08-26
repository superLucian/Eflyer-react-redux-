module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MemberLocation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      id: 'id'
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: 'MemberID'
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Street'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'City'
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'State'
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Country'
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Zip'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Phone'
    },
    hq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: 'HQ'
    },
  }, {
    tableName: 'member_locations',
    timestamps: false,
    freezeTableName: true
  })
};
