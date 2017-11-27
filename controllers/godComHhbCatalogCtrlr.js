var Promise = require('bluebird');
var http = require('http');
var fs = require('fs');
var conf = require("../conf/godComHhbConf.js");
var hhbMdl = require("../models/hhbCatalogMdl.js");

var me = {};
module.exports = me;

var cacthingCursor = {
  testamentIndex: 0,
  pieceIndex: 0,
  chapterIndex: 0,
};

me.create = () => {

  var catalog = {};
  catalog.oldTestament = {};
  catalog.oldTestament.no = 1;
  catalog.oldTestament.name = 'old';
  catalog.oldTestament.description = '旧约';
  catalog.oldTestament.pieces = [];
  for (let i=0, p; p = conf.testaments[0].pieces[i++];) {
    catalog.oldTestament.pieces.push({
      no: p.no,
      name_cn: p.name_cn,
      name_en: p.name_en,
      chapterCount: p.chapterCount
    });
  }

  catalog.newTestament = {};
  catalog.newTestament.no = 1;
  catalog.newTestament.name = 'new';
  catalog.newTestament.description = '新约';
  catalog.newTestament.pieces = [];
  for (let i=0, p; p = conf.testaments[1].pieces[i++];) {
    catalog.newTestament.pieces.push({
      no: p.no,
      name_cn: p.name_cn,
      name_en: p.name_en,
      chapterCount: p.chapterCount
    });
  }

  hhbMdl.save(catalog).then(function (data) {
    console.log('create catalog ok');
  }).catch(function (err) {
    console.log('create catalog failed: {0}', err);
  });
}

