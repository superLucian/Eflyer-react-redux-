var authHelper = require('../helpers/auth-helper');
var errorHelper = require('../helpers/error-helper');
var consts = require('../helpers/consts');

exports.checkUser = function (req, res, next) {

  // TODO: Import PHP session and get user object using it
  req.user = authHelper.devUser(consts.USER_ROLE.USER); // temporary

  var token = authHelper.generateToken(authHelper.serializeUser(req.user));
  authHelper.setTokenCookie(res, token);

  return res.json({
    user: req.user,
    token: token
  });

};
