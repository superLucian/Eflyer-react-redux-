var authHelper = require('../helpers/auth-helper');
var authController = require('../controllers/auth');

module.exports = function (router) {
  // User authentication routes
  router.get('/auth/check-user', authController.checkUser);
};
