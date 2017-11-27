var mongoose = require('mongoose');
var Promise = require("bluebird");

var Schema = mongoose.Schema;

var hhbCatalogSchema = new Schema({
  oldTestament: {type: Object},
  newTestament: {type: Object},
});

hhbCatalogSchema.static('clear', function () {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.remove('', function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  });
});

hhbCatalogSchema.static('save', function (section) {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.create(section, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  })
});

hhbCatalogSchema.static('find', function (fields) {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.find({}, fields, {}, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  });
});

module.exports = db.model('hhbCatalog', hhbCatalogSchema, "hhbCatalog");