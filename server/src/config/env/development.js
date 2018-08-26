/* eslint-disable max-len */

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
  format: 'dev',
  options: {
  }
}

};
