module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MemberContact', {
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
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: 'LocationID'
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Contact'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'Email'
    }
  }, {
    tableName: 'member_contacts',
    timestamps: false,
    freezeTableName: true
  })
};
