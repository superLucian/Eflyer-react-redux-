var consts = require('../helpers/consts');

exports.getDesignOptions = function (req, res, next) {
  res.json({
    themes: consts.FLYER_THEMES,
    frontCovers: consts.FLYER_FRONT_COVERS,
    insideCovers: consts.FLYER_INSIDE_COVERS
  });
};

exports.getThemes = function (req, res, next) {
  res.json(consts.FLYER_THEMES);
};

exports.getFrontCovers = function (req, res, next) {
  res.json(consts.FLYER_FRONT_COVERS);
};

exports.getInsideCovers = function (req, res, next) {
  res.json(consts.FLYER_INSIDE_COVERS);
};
