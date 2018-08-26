var config = require('../config/config');
var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var cors = require('cors');
var compression = require('compression');
var timeout = require('connect-timeout');
var requireDir = require('require-dir');
var path = require('path');
var expressJwt = require('express-jwt');
var errorHelper = require('../helpers/error-helper');
var authHelper = require('../helpers/auth-helper');
var consts = require('../helpers/consts');

/**
 * Initialize local variables
 */
var initLocalVariables = function (app, databases) {
  app.db = databases;
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    req.db = databases;
    next();
  });
};

/**
 * Initialize application middleware
 */
var initMiddleware = function (app) {
  // Showing stack errors
  app.set('showStackError', true);

  // Set timeout
  app.use(timeout(config.webServerTimeout));

  // Gzip-compression
  app.use(compression());
  // app.use(compression({ filter: func}tion() {return true}, threshold: 1 }));

  app.use(cors());

  // Enable logger (morgan)
  app.use(morgan(logger.getFormat(), logger.getOptions()));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Add the cookie parser
  app.use(cookieParser());

};

/**
 * Configure Express session
 */
var initSession = function (app) {
  // Express MongoDB session storage
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    cookie: {
      maxAge: config.sessionCookie.maxAge,
      httpOnly: config.sessionCookie.httpOnly,
      secure: config.sessionCookie.secure
    },
    key: config.sessionKey
  }));
};

/**
 * Configure Express JWT
 */
var initJWT = function (app) {
  app.use(expressJwt({
    secret: config.jwt.secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQueryString (req) {
      if (req.cookies[config.jwt.cookieName]) {
        return req.cookies[config.jwt.cookieName];
      } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === config.jwt.cookieName) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }

      // TODO: remove when publishing to live
      if (process.env.NODE_ENV !== 'production') {
        if (req.query.devtoken === 'eflyer2017user') {
          return authHelper.generateToken(authHelper.serializeUser(authHelper.devUser(consts.USER_ROLE.USER)));
        }
        if (req.query.devtoken === 'eflyer2017admin') {
          return authHelper.generateToken(authHelper.serializeUser(authHelper.devUser(consts.USER_ROLE.ADMIN)));
        }
      }

      return null;
    }
  }));
};

/**
 * Configure Helmet headers configuration
 */
var initHelmetHeaders = function (app) {
  // Use helmet to secure Express headers
  var SIX_MONTHS = 15778476000;
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.use(helmet.hidePoweredBy());
};

/**
 * Configure the server routes
 */
var initServerRoutes = function (app) {

  // API router
  var apiRouter = express.Router();

  // require all API route files recursively
  var routes = requireDir('../routes', { recurse: true });

  Object.keys(routes).forEach(function(_key) {
    if (typeof routes[_key] === 'function') {
      routes[_key](apiRouter);
    }
  });

  var apiPrefix = config.apiPrefix + (config.apiVersion ? '/' + config.apiVersion : '');
  app.use(apiPrefix, apiRouter);

};

/**
 * Setup middlewares and routes to serve client application
 */
var serveClientApp = function (app) {
  if (process.argv.indexOf('--dev') > -1) {

    // Add webpack middlewares
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackConfig = require('../../../client/tools/webpack.config');
    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats
    }));
    app.use(webpackHotMiddleware(compiler));

  }

  if (process.argv.indexOf('--api-only') === -1) {

    // serve static files for client app
    app.use(express.static(path.resolve(__dirname, '../../../client/public')));

    // serve index.html for client app page view request
    app.all('*', function (req, res, next) {
      res.sendFile('index.html', { root: path.resolve(__dirname, '../../../client/public/') });
    });

  }
};

/**
 * global error handling
 */
var handleErrors = function (app) {
  app.use(function handleError(err, req, res, next) {
    if(err.code === 'ENOENT') { err.message = 'File not found'; }
    errorHelper.handleError(res, err, err.status || 500);
  });
};


/**
 * Initialize the Express application
 */
module.exports.init = function (databases) {
  // Initialize express app
  var app = express();

  // Initialize local variables
  initLocalVariables(app, databases);

  // Initialize Express middleware
  initMiddleware(app);

  // Initialize Express session
  // initSession(app); // No need of session since we use JWT

  // Initialize Express JWT
  initJWT(app);

  // Initialize Helmet security headers
  initHelmetHeaders(app);

  // Initialize modules server routes
  initServerRoutes(app);

  // Serve client application for development environment
  serveClientApp(app);

  // global error handling
  handleErrors(app);

  return app;
};
