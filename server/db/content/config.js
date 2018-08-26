var config = require('../../src/config/config');

module.exports = {
  "development": {
    "username"  :     config.db.contentDB.username,
    "password"  :     config.db.contentDB.password,
    "database"  :     config.db.contentDB.dbname,
    "host"      :     config.db.contentDB.host,
    "port"      :     config.db.contentDB.port,
    "dialect"   :     config.db.contentDB.dialect,
    "storage"   :     config.db.contentDB.storage
  }
};
