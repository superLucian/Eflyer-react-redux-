module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanyInfoUpdate', {
    flyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'flyer_id'
    },
    memberContactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'member_contact_id'
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved'),
      defaultValue: 'pending',
      field: 'status'
    }
  }, {
    tableName: 'company_info_update',
    freezeTableName: true,
    timestamps: true,
    underscored: true
  });
};
