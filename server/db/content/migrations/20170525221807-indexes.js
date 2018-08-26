/* eslint-disable node/no-unsupported-features, max-len */
'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(
      [
        queryInterface.addIndex('flyers', ['member_contact_id'], { indexName: 'flyers_member_contact_id' }),

        queryInterface.addIndex('flyer_products', ['flyer_id'], { indexName: 'flyer_products_flyer_id' }),
        queryInterface.addIndex('flyer_products', ['partnum'], { indexName: 'flyer_products_partnum' }),

        queryInterface.addIndex('company_info_update', ['flyer_id'], { indexName: 'company_info_update_flyer_id_unique', indicesType: 'UNIQUE' }),
        queryInterface.addIndex('company_info_update', ['member_contact_id'], { indexName: 'company_info_update_member_contact_id' })
      ]
    );
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all(
      [
        queryInterface.removeIndex('flyers', 'flyers_member_contact_id'),

        queryInterface.removeIndex('flyer_products', 'flyer_products_flyer_id'),
        queryInterface.removeIndex('flyer_products', 'flyer_products_partnum'),

        queryInterface.removeIndex('company_info_update', 'company_info_update_flyer_id_unique'),
        queryInterface.removeIndex('company_info_update', 'company_info_update_member_contact_id')
      ]
    );
  }
};
