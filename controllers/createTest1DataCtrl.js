var Promise = require('bluebird');
var test1Mdl = require("../models/test1Mdl.js");

var me = {};
module.exports = me;

me.beginCatch = () => {
  for (var i = 0; i<1000000;i++) {
    ((i) => {
      test1Mdl.save({
        a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        b: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        c: 'cccccccccccccccccccccccccccccccccccccc'
      }).then(function (data) {
        console.log('ok %s', i)
      }).catch(function (err) {
        console.log('failed %s', i)
      });
    })();
  }
}