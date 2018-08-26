var config = require('../../src/config/config');

module.exports = {
  "development": {
    "username"  :     config.db.recordsDB.username,
    "password"  :     config.db.recordsDB.password,
    "database"  :     config.db.recordsDB.dbname,
    "host"      :     config.db.recordsDB.host,
    "port"      :     config.db.recordsDB.port,
    "dialect"   :     config.db.recordsDB.dialect,
    "storage"   :     config.db.recordsDB.storage
  }
};
