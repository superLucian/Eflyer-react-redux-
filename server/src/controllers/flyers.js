var _ = require('lodash');
var errorHelper = require('../helpers/error-helper');
var logger = require('../helpers/logger');

exports.getAutosave = function (req, res, next) {

  var models = req.db.content.models;
  models.Flyer.findOne({
    where: {
      membmerContactId: req.user.id,
      status: 'draft'
    },
    include: [
      {model: models.FlyerProduct, as: 'products'}
    ]
  })
  .then(function (flyer) {
    if (!flyer) {
      return res.json(null);
    }
    res.json(flyer);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.createAutosave = function (req, res, next) {

  var data = _.omit(req.body, ['id', 'membmerContactId', 'status', 'autosavedAt', 'submittedAt', 'approvedAt']);
  data.membmerContactId = req.user.id;
  data.status  ='draft';

  var models = req.db.content.models;
  models.Flyer.destroy({
    where: {
      membmerContactId: req.user.id,
      status: 'draft'
    }
  })
  .then(function () {
    return models.Flyer.create(data);
  })
  .then(function (created) {
    res.json(created);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.updateAutosave = function (req, res, next) {

  var data = _.omit(req.body, ['id', 'membmerContactId', 'status', 'submittedAt', 'approvedAt']);
  data.autosavedAt = new Date();

  var models = req.db.content.models;
  models.Flyer.update(
    data,
    {
      where: {
        membmerContactId: req.user.id,
        status: 'draft'
      }
    })
  .then(function (result) {
    if (!(Array.isArray(result) && result[0])) {
      return errorHelper.handleError(res, 'Failed to save the flyer');
    }
    return models.Flyer.findOne({
      where: {
        membmerContactId: req.user.id,
        status: 'draft'
      }
    }).then(function (flyer) {
      res.json(flyer);
    });
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};


exports.submit = function (req, res, next) {

  var models = req.db.content.models;
  var saved = null, submitted = false;
  models.Flyer.findOne({
    where: {
      membmerContactId: req.user.id,
      status: 'draft'
    },
    include: [
      {model: models.FlyerProduct, as: 'products'}
    ]
  })
  .then(function (flyer) {
    if (!flyer) {
      return errorHelper.handleError(res, 'No saved flyer existing', 404);
    }

    saved = flyer;
    return models.Flyer.update(
      {
        status: 'pending',
        submittedAt: new Date()
      },
      {
        where: {id: saved.id}
      }
    );
  })
  .then(function (updateResult) {
    if (!saved) return;
    if (!(Array.isArray(updateResult) && updateResult[0])) {
      return errorHelper.handleError(res, 'Failed to submit flyer');
    }

    submitted = true;
    return req.db.records.models.MemberContact.findOne({
      where: {id: req.user.id},
      include: [{all: true}]
    })
    .then(function (userData) {
      if (hasCompanyInfoBeenEdited(saved, userData)) {
        return models.CompanyInfoUpdate.destroy({
          where: {flyerId: saved.id}
        }).then(function () {
          return models.CompanyInfoUpdate.create({
            flyerId: saved.id,
            memberContactId: req.user.id,
            status: 'pending'
          });
        });
      }
    })
    .catch(function (err) {
      logger.info('Failed to handle CompanyInfoUpdate for newly submitted flyer!');
      logger.error(err);
    });
  })
  .then(function () {
    submitted && res.json({success: true});
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

/**
 * @return boolean true when different
 * @param flyer data including company info that has possibly been edited
 * @param userData original user data including original company info
 */
function hasCompanyInfoBeenEdited(flyer, userData) {
  return flyer && userData && (
    flyer.companyName !== userData.Member.name
    || flyer.companyAddressStreet !== userData.MemberLocation.street
    || flyer.companyAddressCity !== userData.MemberLocation.city
    || flyer.companyAddressState !== userData.MemberLocation.state
    || flyer.companyAddressCountry !== userData.MemberLocation.country
    || flyer.companyAddressZip !== userData.MemberLocation.zip
    || flyer.companyPhone !== userData.MemberLocation.phone
    || flyer.companyWebsite !== userData.Member.website
    || flyer.companyDescription !== userData.MemberDescription.aboutUs
  );
}


/////////////////////////////////
// === Common CRUD methods === //
/////////////////////////////////

exports.list = function (req, res, next) {

  var models = req.db.content.models;
  models.Flyer.findAll({
    where: {
      membmerContactId: req.user.id
    },
    include: [
      {model: models.FlyerProduct, as: 'products'}
    ]
  })
  .then(function (flyers) {
    if (!flyers) {
      return errorHelper.handleError(res, 'Unable to find flyers', 404);
    }
    res.json(flyers);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.create = function (req, res, next) {

  var flyer = _.omit(req.body, ['id', 'autosavedAt', 'submittedAt', 'approvedAt']);
  flyer.membmerContactId = req.user.id;

  var models = req.db.content.models;
  models.Flyer.create(flyer)
  .then(function (created) {
    res.json(created);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.read = function (req, res, next) {

  var models = req.db.content.models;
  models.Flyer.findOne({
    where: {
      id: req.params.flyerId,
      membmerContactId: req.user.id,
    },
    include: [
      {model: models.FlyerProduct, as: 'products'}
    ]
  })
  .then(function (flyer) {
    if (!flyer) {
      return errorHelper.handleError(res, 'Flyer not existing or insufficient permission', 404);
    }
    res.json(flyer);
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.update = function (req, res, next) {

  var data = _.omit(req.body, ['id', 'membmerContactId', 'autosavedAt', 'submittedAt', 'approvedAt']);

  var models = req.db.content.models;
  models.Flyer.update(
    data,
    {
      where: {
        id: req.params.flyerId,
        membmerContactId: req.user.id
      }
    })
  .then(function (result) {
    if (!(Array.isArray(result) && result[0])) {
      return errorHelper.handleError(res, 'Failed to update the flyer');
    }
    return models.Flyer.findOne({
      where: {
        id: req.params.flyerId,
        membmerContactId: req.user.id
      }
    }).then(function (flyer) {
      res.json(flyer);
    });
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};

exports.delete = function (req, res, next) {

  var models = req.db.content.models;
  models.Flyer.destroy({
    where: {
      id: req.params.flyerId,
      membmerContactId: req.user.id
    }
  })
  .then(function (result) {
    if (!result) {
      // No existing flyer to delete
      return errorHelper.handleError(res, 'Flyer not existing or insufficient permission', 404);
    }
    return models.CompanyInfoUpdate.destroy({
      where: {
        flyerId: req.params.flyerId,
        status: 'pending'
      }
    })
    .then(function () {
      res.json({id: req.params.flyerId});
    });
  })
  .catch(function (err) {
    return errorHelper.handleError(res, err);
  });

};