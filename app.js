var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mongoOptions = {user:'bobenut',pass:'bobenutAbc123456789!'}
mongoose.connect('mongodb://localhost:14910/bibles',mongoOptions);
global.db = mongoose.connection;
global.db.on("error", function (err) {
  console.log("connect db failed:", err);
});
global.db.on("openUri",function(){
  console.log("connected db");
  createTest1DataCtrl.beginCatch();
});

var godComHhbCtrlr = require('./controllers/godComHhbCtrlr');
var createTest1DataCtrl = require('./controllers/createTest1DataCtrl');

godComHhbCtrlr.beginCatch();
//createTest1DataCtrl.beginCatch();

