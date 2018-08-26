/* eslint-disable quotes */

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

var throng = require('throng');
var config = require('./config/config');
var db = require('./core/db');
var express = require('./core/express');
var chalk = require('chalk');
var logger = require('./helpers/logger');


//
// Initialize Express
// -----------------------------------------------------------------------------
function init(callback) {
  db.connect(function(databases) {
    // Initialize express
    var app = express.init(databases);
    if (callback) callback(app, config);
  });
}

function start(workerId, callback) {

  init(function (app, config) {

    // Start the app by listening on <port>
    app.listen(config.port, function () {

      // Logging initialization
      (!workerId || workerId === 1) && logger.info(chalk.green(
        "\n ------------------------------------------------------\r\n",
        "Databases connected" + "\n",
        "The server is running at " + config.host + "/\n",
        "Environment:\t\t" + process.env.NODE_ENV + "\n",
        "Port:\t\t\t" + config.port + "\n",
        "------------------------------------------------------\n"));

      if (callback) callback(app, config);
    });

  });

}

/**
 * Starting web server with clusters
 * When serving client application with webpack-dev-middleware, force to run a single worker
 */
var webConcurrency = process.env.NODE_ENV !== 'development' && process.argv.indexOf('--dev') === -1 ? config.webConcurrency : 1;
throng({
  workers: webConcurrency,

  master: function() {
    logger.info(chalk.magenta('Master cluster started, setting up ' + webConcurrency + ' worker(s) ...'));
  },

  start: function(id) {
    logger.info(chalk.yellow('Worker #' + id + ' started'));
    start(id);

    process.on('SIGTERM', function () {
      logger.info(chalk.cyan('Worker ' + id + ' exiting ...'));
      process.exit();
    });
  }
});
