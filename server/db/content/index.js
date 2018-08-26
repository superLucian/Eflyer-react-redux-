var Sequelize = require('sequelize');
var requireDir = require('require-dir');
var config = require('../../src/config/config');

module.exports = function initialize() {
  var sequelize = new Sequelize(config.db.contentDB.dbname, config.db.contentDB.username, config.db.contentDB.password, {
    host: config.db.contentDB.host,
    port: config.db.contentDB.port,
    storage: config.db.contentDB.storage
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
  db.models.Product.hasOne(db.models.ProductName, { foreignKey: 'partNum', as: 'name' });
  db.models.Product.hasOne(db.models.ProductDescription, { foreignKey: 'partNum', as: 'description' });
  db.models.Product.hasOne(db.models.ProductPrice, { foreignKey: 'partNum', as: 'price' });
  db.models.Product.hasOne(db.models.ProductCategory, { foreignKey: 'partNum', as: 'category' });

  db.models.Flyer.hasMany(db.models.FlyerProduct, { foreignKey: 'flyerId', as: 'products' });
  db.models.FlyerProduct.belongsTo(db.models.Flyer, { foreignKey: 'flyerId', as: 'flyer' });
  db.models.Flyer.hasOne(db.models.CompanyInfoUpdate, { foreignKey: 'flyerId' });
  db.models.CompanyInfoUpdate.belongsTo(db.models.Flyer, { foreignKey: 'flyerId', as: 'flyer' });

  return db;
}
