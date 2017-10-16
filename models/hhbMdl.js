var mongoose = require('mongoose');
var Promise = require("bluebird");

var Schema = mongoose.Schema;

var hhbSectionSchema = new Schema({
  testamentNo: {type: Number, default: 0},
  testamentNameEn: {type: String, default: ''},
  testamentNameCn: {type: String, default: ''},
  pieceNo: {type: Number, default: 0},
  pieceNameEn: {type: String, default: ''},
  pieceNameCn: {type: String, default: ''},
  chapterNo: {type: Number, default: 0},
  sectionNo: {type: Number, default: 0},
  sectionContent: {type: String, default: ''}
});

hhbSectionSchema.static('clear', function () {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.remove('', function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  });
});

hhbSectionSchema.static('save', function (section) {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.create(section, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  })
});

hhbSectionSchema.static('findSections', function (filter, fields, sort) {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.find(filter, fields, {sort: sort}, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  });
});

module.exports = db.model('hhbSection', hhbSectionSchema, "hhbSections");