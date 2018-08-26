var authHelper = require('../helpers/auth-helper');
var suppliersController = require('../controllers/suppliers');

module.exports = function (router) {

  router.route('/suppliers')
    .get(authHelper.checkAuth(), suppliersController.list);

};
