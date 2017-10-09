var Promise = require('bluebird');
var http = require('http');
var fs = require('fs');
var iconv = require('iconv-lite');
const cheerio = require('cheerio');
var conf = require("../conf/godComHhbConf.js");

var me = {};
module.exports = me;

var cacthingCursor = {
  testamentIndex: 0,
  pieceIndex: 0,
  chapterIndex: 0,
};

me.beginCatch = () => {
  catchPage()
    .then(takeoutOneChapter)
    .then(saveOneChapterIntoDisk)
    .then(cursorGoNext)
    .then(isCatchEnd)
    .then(() => {
      setTimeout(me.beginCatch, 500);
    },
      (err) => {
      console.log('%s', err.message);
    })
    .catch((err) => {
      console.log('catch page failed: %s', err);
    })
}

function catchPage() {
  return new Promise(function (resolve, reject) {

    var chapterUrlPrexfix = conf.testaments[cacthingCursor.testamentIndex].pieces[cacthingCursor.pieceIndex].urlPrexfix;
    var chapterUrlSuffix = conf.testaments[cacthingCursor.testamentIndex].pieces[cacthingCursor.pieceIndex].urlSuffix;
    var chapterUrl = chapterUrlPrexfix + addPreZero(cacthingCursor.chapterIndex + 1) + chapterUrlSuffix;
    var requestOptions = {
      host: conf.domain,
      path: conf.url + '/' + chapterUrl,
      method: 'GET',
    };
  
    var req = http.request(requestOptions, (res) => {
      var resDataBuffer = [];
      var resDataBufferSize = 0;
  
      res.on('data', function (chunk) {
        resDataBuffer.push(chunk);
        resDataBufferSize += chunk.length;
      });
  
      res.on('end',() => {
        var pageData = new Buffer(resDataBufferSize);
        for (var i = 0, cursorPos = 0, bufferChunck; bufferChunck = resDataBuffer[i++]; ) {
          bufferChunck.copy(pageData, cursorPos);
          cursorPos += bufferChunck.length;
        }

        resolve(iconv.decode(pageData,'gb2312'));
      })
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end(); 
  });
}

function takeoutOneChapter(pageData) {
  return new Promise(function (resolve, reject) {
    try{
      var oneChapter = {};
      var $ = cheerio.load(pageData);
      oneChapter.sections = $('p').find('tr').map((i, ele) => {
    
        var pieceAndSectionNo = ($(ele.children[0])).text();
    
        if(!pieceAndSectionNo || pieceAndSectionNo.trim() === ''){
          return null;
        }
    
        return {
          sectionNo: pieceAndSectionNo.split(':')[1],
          sectionContent: ($(ele.children[1])).text().replace(/[\r\n]/g,"")
        }
    
      }).get();
      
      oneChapter.testamentNo = conf.testaments[cacthingCursor.testamentIndex].no;
      oneChapter.testamentName = conf.testaments[cacthingCursor.testamentIndex].name;
      oneChapter.testamentDescription = conf.testaments[cacthingCursor.testamentIndex].description;
      oneChapter.pieceNo = conf.testaments[cacthingCursor.testamentIndex].pieces[cacthingCursor.pieceIndex].no;
      oneChapter.pieceNameCn = conf.testaments[cacthingCursor.testamentIndex].pieces[cacthingCursor.pieceIndex].name_cn;
      oneChapter.pieceNameEn = conf.testaments[cacthingCursor.testamentIndex].pieces[cacthingCursor.pieceIndex].name_en;
      oneChapter.pieceChapterNum = cacthingCursor.chapterIndex + 1;
      resolve(oneChapter);
    }catch(err){
      reject(err);
    }
  });
}

function saveOneChapter(oneChapter) {
  return new Promise(function (resolve, reject) {
    console.log(oneChapter);
    resolve(oneChapter);
  });
}

function cursorGoNext(oneChapter) {
  return new Promise(function (resolve, reject) {
    cacthingCursor.chapterIndex++;
    
    if(cacthingCursor.chapterIndex >= conf.testaments[cacthingCursor.testamentIndex].pieces[cacthingCursor.pieceIndex].chapterCount) {
      cacthingCursor.pieceIndex++;
      cacthingCursor.chapterIndex=0;
    }

    if(cacthingCursor.pieceIndex >= conf.testaments[cacthingCursor.testamentIndex].pieces.length) {
      cacthingCursor.testamentIndex++;
      cacthingCursor.pieceIndex = 0;
      cacthingCursor.chapterIndex = 0;
    }

    resolve(oneChapter);
  });
}

function isCatchEnd(oneChapter) {
  return new Promise(function (resolve, reject) {
    if(cacthingCursor.testamentIndex >= conf.testaments.length) {
      reject(new Error('CATCH_END'));
    } else {
      resolve(oneChapter);
    }
  });
}

function addPreZero(num){
  return ('000000000'+num).slice(-3);
}

function saveOneChapterIntoDisk(oneChapter) {
  return new Promise(function (resolve, reject) {
    var filePath = 'public/bibles/hhb' + '/' + 
      oneChapter.testamentDescription + '-' + 
      addPreZero(oneChapter.pieceNo) + 
      oneChapter.pieceNameCn + 
      '-' +  
      addPreZero(oneChapter.pieceChapterNum) + 
      '.txt';

    fs.writeFile(filePath, JSON.stringify(oneChapter.sections, null, 2), (err) => {
      if(err) {
        reject(err);
        return;
      }
      console.log(oneChapter);
      resolve(oneChapter);
    });
  });
}

function saveOneChapterIntoMongodb(oneChapter) {
  return new Promise(function (resolve, reject) {
    console.log(oneChapter);
    resolve(oneChapter);
  });
}