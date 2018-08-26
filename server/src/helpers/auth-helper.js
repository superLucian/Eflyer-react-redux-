var _ = require('lodash');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var errorHelper = require('./error-helper');

exports.checkAuth = function (permissions, allowDisabled) {
  return function (req, res, next) {
    if (!req.user) {
      return errorHelper.handleError(res, 'Authentication Required', 401);
    }

    // if the route is not allowed for disabled users
    if (!allowDisabled && !req.user.enabled) {
      return errorHelper.handleError(res, 'Account Disabled', 402);
    }

    // Reset token & cookie to reset expiration. This makes the token expire in x hours of user inactivity.
    var token = exports.generateToken(exports.serializeUser(req.user));
    exports.setTokenCookie(res, token);

    if (!permissions) {
      return next();
    }

    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }

    if (!permissions.length) {
      return next();
    }

    if (!Array.isArray(req.user.roles) || !req.user.roles.length) {
      return errorHelper.handleError(res, 'Insufficient Permissions', 403);
    }

    var allowed = permissions.some(function(perm) {
      return req.user.roles.indexOf(perm) > -1;
    });

    if (!allowed) {
      return errorHelper.handleError(res, 'Insufficient Permissions', 403);
    }

    return next();
  };
};

exports.serializeUser = function (user) {
  // Remove sensitive data
  var userData = _.pick(user, ['id', 'memberId', 'locationId', 'contact', 'email', 'roles', 'enabled']);

  userData._id = String(userData._id);

  return userData;
};

exports.generateToken = function (user) {
  return jwt.sign(
    user,
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

exports.setTokenCookie = function (res, token) {
  res.cookie(config.jwt.cookieName, token, {
    expires: new Date(Date.now() + config.jwt.expiresIn * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
  });
};

// TODO: remove when publishing to live
exports.devUser = function (role) {
  return {
    "id" : 1,
    "memberId" : 1,
    "locationId" : 1,
    "contact" : "John Smith",
    "email" : "johnsmith@membersite.com",
    "roles" : [
      role
    ],
    "enabled" : true
  };
};
