/* eslint-disable max-len */

var protocol = process.env.EFLYER_PROTOCOL || 'http';
var port = process.env.EFLYER_PORT || process.env.PORT || 5000;

module.exports = {

  protocol: protocol,
  port: port,
  host: protocol + '://' + (process.env.EFLYER_HOSTNAME || ('127.0.0.1:' + port)),

  webConcurrency: process.env.WEB_CONCURRENCY || require('os').cpus().length,

  apiPrefix: process.env.EFLYER_API_PREFIX || '/api',
  apiVersion: process.env.EFLYER_API_VERSION || 'v1',

  // Session Cookie settings
  sessionCookie: {
    // session expiration set to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    httpOnly: true,
    secure: false
  },
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: process.env.EFLYER_SESSION_SECRET || 'eflyer',
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',

  webServerTimeout: '20s',

  jwt: {
    secret: process.env.EFLYER_JWT_SECRET || 'E-Flyer',
    expiresIn: 24 * 60 * 60, // 24 hours in seconds
    cookieName: process.env.EFLYER_JWT_COOKIE_NAME || 'ef_sss'
  },

  logLevel: process.env.EFLYER_LOG_LEVEL || 'debug', // winston logging level

};
