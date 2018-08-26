var _ = require('lodash');
var errorHelper = require('../helpers/error-helper');

exports.requireFlyerIdQueryParam = function (req, res, next) {
  if (!req.query.flyer) {
    return errorHelper.handleError(res, 'flyerId query parameter is missing', 400);
  }
  next();
};

exports.validateFlyer = function (req, res, next) {
  var models = req.db.content.models;
  models.Flyer.findOne({
    where: {id: req.query.flyer}
  })
  .then(function (flyer) {
    if (!flyer) {
      return errorHelper.handleError(res, 'Flyer not existing', 400);
    }
    if (String(flyer.membmerContactId) !== String(req.user.id)) {
      return errorHelper.handleError(res, 'Insufficient permission', 403);
    }
    next();
    return null;
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });
};


exports.validatePartNum = function (req, res, next) {

  if (!req.body.partNum) {
    return next();
  }

  var models = req.db.content.models;
  models.Product.findOne({
    where: {partNum: req.body.partNum}
  })
  .then(function (product) {
    if (!product) {
      return errorHelper.handleError(res, 'No product with such partNum', 400);
    }
    next();
  });

};

exports.list = function (req, res, next) {

  var models = req.db.content.models;
  models.FlyerProduct.findAll({
    where: {
      flyerId: req.query.flyer
    }
  })
  .then(function (flyerProducts) {
    if (!flyerProducts) {
      return errorHelper.handleError(res, 'Unable to find flyer products', 404);
    }
    res.json(flyerProducts);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.create = function (req, res, next) {

  var flyerProduct = _.omit(req.body, ['id', 'flyerId']);
  flyerProduct.flyerId = req.query.flyer;

  var models = req.db.content.models;
  models.FlyerProduct.create(flyerProduct)
  .then(function (created) {
    res.json(created);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};


exports.flyerProductById = function (req, res, next) {

  var models = req.db.content.models;
  models.FlyerProduct.findOne({
    where: {id: req.params.flyerProductId},
    include: [
      {model: models.Flyer, as: 'flyer'}
    ]
  })
  .then(function (flyerProduct) {
    if (!flyerProduct) {
      return errorHelper.handleError(res, 'Unable to find a flyer product with such ID', 404);
    }
    if (!flyerProduct.flyer) {
      return errorHelper.handleError(res, 'Invalid flyer product', 400);
    }
    if (String(flyerProduct.flyer.membmerContactId) !== String(req.user.id)) {
      return errorHelper.handleError(res, 'Insufficient permission', 403);
    }
    req.flyerProduct = flyerProduct;
    next();
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.read = function (req, res, next) {

  res.json(_.omit(JSON.parse(JSON.stringify(req.flyerProduct)), 'flyer'));

};

exports.update = function (req, res, next) {

  var data = _.omit(req.body, ['id', 'flyerId']);

  var models = req.db.content.models;
  models.FlyerProduct.update(
    data,
    {
      where: {id: req.params.flyerProductId}
    })
  .then(function (result) {
    if (!(Array.isArray(result) && result[0])) {
      return errorHelper.handleError(res, 'Failed to update the flyer product');
    }
    return models.FlyerProduct.findOne({
      where: {id: req.params.flyerProductId}
    }).then(function (flyerProduct) {
      res.json(flyerProduct);
    });
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.delete = function (req, res, next) {

  var models = req.db.content.models;
  models.FlyerProduct.destroy({
    where: {id: req.params.flyerProductId}
  })
  .then(function (result) {
    res.json({id: req.params.flyerProductId});
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};
