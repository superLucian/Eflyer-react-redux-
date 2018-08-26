var errorHelper = require('../helpers/error-helper');

exports.search = function (req, res, next) {

  var models = req.db.content.models;
  var conditions = [];
  if (req.query.supplierId) {
    conditions.push({$or: [
      {$and: [{supplierId: req.query.supplierId}, {subId: null}]},
      {subId: req.query.supplierId}
    ]});
  }
  if (req.query.partNum) {
    conditions.push({partNum: {$like: '%' + req.query.partNum + '%'}});
  }
  models.Product.findAll({
    where: {$and: conditions},
    include: [
      {model: models.ProductName, as: 'name'},
      {model: models.ProductDescription, as: 'description'},
      {model: models.ProductPrice, as: 'price'},
      {model: models.ProductCategory, as: 'category'}
    ]
  })
  .then(function (products) {
    if (!products) {
      return errorHelper.handleError(res, 'Unable to find products', 404);
    }
    res.json(products);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};
