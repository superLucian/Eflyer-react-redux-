/* eslint-disable max-len */

var authHelper = require('../helpers/auth-helper');
var fpController = require('../controllers/flyer_products');

module.exports = function (router) {

  router.route('/flyer-products')
    .get(authHelper.checkAuth(), fpController.requireFlyerIdQueryParam, fpController.validateFlyer, fpController.list)
    .post(authHelper.checkAuth(), fpController.requireFlyerIdQueryParam, fpController.validateFlyer, fpController.validatePartNum,  fpController.create);

  router.route('/flyer-products/:flyerProductId')
    .get(authHelper.checkAuth(), fpController.read)
    .put(authHelper.checkAuth(), fpController.validatePartNum, fpController.update)
    .delete(authHelper.checkAuth(), fpController.delete);

  router.param('flyerProductId', fpController.flyerProductById);
};
