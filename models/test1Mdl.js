var mongoose = require('mongoose');
var Promise = require("bluebird");

var Schema = mongoose.Schema;

var test1Schema = new Schema({
  a: {type: String, default: ''},
  b: {type: String, default: ''},
  c: {type: String, default: ''}
});

test1Schema.static('save', function (section) {
  var self = this;

  return new Promise(function (resolve, reject) {
      self.create(section, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
      });
  })
});


module.exports = db.model('test1', test1Schema, "test1");