var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

/**
 * Add webpack middlewares
 */
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: webpackConfig.stats
}));
app.use(webpackHotMiddleware(compiler));

// serve static files for client app
app.use(express.static(path.resolve(__dirname, '../public')));

// serve D3 visualization app
app.use(express.static(path.resolve(__dirname, '../../public')));

// serve index.html for client app page view request
app.all('*', function (req, res, next) {
  res.sendFile('index.html', { root: path.resolve(__dirname, '../public/') });
});


/**
 * Get port from arguments and store in Express.
 */
var argv = require('minimist')(process.argv.slice(2));
var hostname = argv.host || '127.0.0.1';
var port = normalizePort(argv.port || '6001');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.info('Listening on ' + bind);
  console.info('Go to http://%s:%s', hostname, port);
}
