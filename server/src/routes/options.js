var authHelper = require('../helpers/auth-helper');
var optionsController = require('../controllers/options');

module.exports = function (router) {

  router.route('/options/design')
    .get(authHelper.checkAuth(), optionsController.getDesignOptions);
  router.route('/options/themes')
    .get(authHelper.checkAuth(), optionsController.getThemes);
  router.route('/options/front-covers')
    .get(authHelper.checkAuth(), optionsController.getFrontCovers);
  router.route('/options/inside-covers')
    .get(authHelper.checkAuth(), optionsController.getInsideCovers);

};
