var initContentDB = require('../../db/content');
var initRecordsDB = require('../../db/records');

module.exports.connect = function(callback) {

  var databases = {
    content: initContentDB(),
    records: initRecordsDB()
  }

  callback(databases);

};