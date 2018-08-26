var Sequelize = require('sequelize');
var requireDir = require('require-dir');
var config = require('../../src/config/config');

module.exports = function initialize() {
  var sequelize = new Sequelize(config.db.recordsDB.dbname, config.db.recordsDB.username, config.db.recordsDB.password, {
    host: config.db.recordsDB.host,
    port: config.db.recordsDB.port,
    storage: config.db.recordsDB.storage
  });

  var models = requireDir('./models', { recurse: false });
  var db = { orm: Sequelize, connection: sequelize, models: {} };

  Object.keys(models).forEach(function(_key) {
    if (typeof models[_key] === 'function') {
      var model = models[_key](sequelize, Sequelize);
      db.models[model.name] = model;
    }
  });

  // relations/associations
  db.models.MemberContact.belongsTo(db.models.Member, { foreignKey: 'memberId' });
  db.models.MemberContact.belongsTo(db.models.MemberLocation, { foreignKey: 'locationId' });
  db.models.MemberContact.hasOne(db.models.MemberDescription, { foreignKey: 'memberId', targetKey: 'memberId' });
  db.models.MemberContact.hasOne(db.models.MemberLogo, { foreignKey: 'memberId', targetKey: 'memberId' });

  return db;
}
