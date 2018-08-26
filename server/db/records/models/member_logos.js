module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MemberLogo', {
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
    largeCLR: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'LargeCLR'
    },
    largeGRY: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'LargeGRY'
    },
    largeBLK: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'LargeBLK'
    },
    largeREV: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'LargeREV'
    }
  }, {
    tableName: 'member_logos',
    timestamps: false,
    freezeTableName: true
  })
};
