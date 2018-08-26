var authHelper = require('../helpers/auth-helper');
var flyersController = require('../controllers/flyers');

module.exports = function (router) {

  router.route('/flyers/autosave')
    .get(authHelper.checkAuth(), flyersController.getAutosave)
    .post(authHelper.checkAuth(), flyersController.createAutosave)
    .put(authHelper.checkAuth(), flyersController.updateAutosave);

  router.route('/flyers/submit')
    .get(authHelper.checkAuth(), flyersController.submit);

  router.route('/flyers')
    .get(authHelper.checkAuth(), flyersController.list)
    .post(authHelper.checkAuth(), flyersController.create);

  router.route('/flyers/:flyerId')
    .get(authHelper.checkAuth(), flyersController.read)
    .put(authHelper.checkAuth(), flyersController.update)
    .delete(authHelper.checkAuth(), flyersController.delete);

};
