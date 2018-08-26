var authHelper = require('../helpers/auth-helper');
var productsController = require('../controllers/products');

module.exports = function (router) {

  router.route('/products')
    .get(authHelper.checkAuth(), productsController.search);

};
