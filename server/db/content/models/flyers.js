module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Flyer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    membmerContactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'member_contact_id'
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'contact_name'
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'contact_email'
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'contact_phone'
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'theme'
    },
    frontCover: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'front_cover'
    },
    insideCover: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'inside_cover'
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_name'
    },
    companyAddressStreet: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_address_street'
    },
    companyAddressCity: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_address_city'
    },
    companyAddressState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_address_state'
    },
    companyAddressCountry: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_address_country'
    },
    companyAddressZip: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_address_zip'
    },
    companyPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_phone'
    },
    companyWebsite: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_website'
    },
    companyDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'company_description'
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_logo'
    },
    flyerName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'flyer_name'
    },
    flyerNameColorRGB: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'flyer_name_color_rgb'
    },
    flyerNameFontSize: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'flyer_name_font_size'
    },
    flyerNameFontFamily: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'flyer_name_font_family'
    },
    flyerNameFontStyle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'flyer_name_font_style'
    },
    flyerNameFontWeight: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'flyer_name_font_weight'
    },
    status: {
      type: DataTypes.ENUM('draft', 'pending', 'approved'),
      defaultValue: 'draft',
      field: 'status'
    },
    autosavedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'autosaved_at'
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'submitted_at'
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'approved_at'
    }
  }, {
    tableName: 'flyers',
    freezeTableName: true,
    timestamps: true,
    underscored: true
  });
};
