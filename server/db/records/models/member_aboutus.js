module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MemberDescription', {
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
    aboutUs: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'AboutUs'
    }
  }, {
    tableName: 'member_aboutus',
    timestamps: true,
    createdAt: false,
    updatedAt: 'lastUpdated',
    freezeTableName: true
  })
};
