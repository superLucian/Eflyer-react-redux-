'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('company_info_update', {
      flyer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      member_contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved'),
        defaultValue: 'pending'
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
    return queryInterface.dropTable('company_info_update');
  }
};
