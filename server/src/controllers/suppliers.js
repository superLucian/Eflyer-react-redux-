var errorHelper = require('../helpers/error-helper');

exports.list = function (req, res, next) {

  var models = req.db.records.models;
  models.Supplier.findAll()
  .then(function (suppliers) {
    if (!suppliers) {
      return errorHelper.handleError(res, 'Unable to find suppliers', 404);
    }
    res.json(suppliers);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};
