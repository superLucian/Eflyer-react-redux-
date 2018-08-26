/* eslint-disable max-len */

var path = require('path');

module.exports = {

db: {
  contentDB: {
    dialect: process.env.EFLYER_CONTENT_DB_DIALECT || 'mysql',
    host: process.env.EFLYER_CONTENT_DB_HOST || 'localhost',
    port: process.env.EFLYER_CONTENT_DB_PORT || 3306,
    dbname: process.env.EFLYER_CONTENT_DB_NAME || 'edgegro1_content_data',
    username: process.env.EFLYER_CONTENT_DB_USERNAME || 'root',
    password: process.env.EFLYER_CONTENT_DB_PASSWORD || ''
  },
  recordsDB: {
    dialect: process.env.EFLYER_RECORDS_DB_DIALECT || 'mysql',
    host: process.env.EFLYER_RECORDS_DB_HOST || 'localhost',
    port: process.env.EFLYER_RECORDS_DB_PORT || 3306,
    dbname: process.env.EFLYER_RECORDS_DB_NAME || 'edgegro1_records',
    username: process.env.EFLYER_RECORDS_DB_USERNAME || 'root',
    password: process.env.EFLYER_RECORDS_DB_PASSWORD || ''
  }
},

log: {
  // logging with Morgan - https://github.com/expressjs/morgan
  // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
  format: process.env.LOG_FORMAT || 'combined',
  options: {
    // Stream defaults to process.stdout
    // Uncomment/comment to toggle the logging to a log on the file system
    stream: {
      directoryPath: process.env.LOG_DIR_PATH || path.resolve(__dirname, '../../../'),
      fileName: process.env.LOG_FILE || 'access.log',
      rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
        active: process.env.LOG_ROTATING_ACTIVE === 'true' ? true : false, // activate to use rotating logs 
        fileName: process.env.LOG_ROTATING_FILE || 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
        frequency: process.env.LOG_ROTATING_FREQUENCY || 'daily',
        verbose: process.env.LOG_ROTATING_VERBOSE === 'true' ? true : false
      }
    }
  }
}

};
