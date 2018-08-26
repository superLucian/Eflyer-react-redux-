var authHelper = require('../helpers/auth-helper');
var companyController = require('../controllers/company');

module.exports = function (router) {

  router.route('/company')
    .get(authHelper.checkAuth(), companyController.getCompanyInfo);

};
