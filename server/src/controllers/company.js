var errorHelper = require('../helpers/error-helper');

exports.getCompanyInfo = function (req, res, next) {

  var models = req.db.records.models;
  models.MemberContact.findOne({
    where: {id: req.user.id},
    include: [{all: true}]
  })
  .then(function (result) {
    if (!result) {
      return errorHelper.handleError(res, 'Company information not found', 404);
    }
    res.json(result);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};
