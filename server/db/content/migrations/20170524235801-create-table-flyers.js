'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('flyers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      member_contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contact_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      front_cover: {
        type: Sequelize.STRING,
        allowNull: true
      },
      inside_cover: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_address_street: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_address_city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_address_state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_address_country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_address_zip: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      company_logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flyer_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flyer_name_color_rgb: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flyer_name_font_size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flyer_name_font_family: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flyer_name_font_style: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flyer_name_font_weight: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('draft', 'pending', 'approved'),
        defaultValue: 'draft'
      },
      autosaved_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      submitted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      approved_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      charset: 'utf8'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('flyers');
  }
};
