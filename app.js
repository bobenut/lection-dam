var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// global.db = mongoose.createConnection('mongodb://localhost/bibles');
// db.on("error", function (err) {
//   console.log("connect db failed:", err);
// });
// db.on("open",function(){
//   console.log("connected db");
// });

var godComHhbCtrlr = require('./controllers/godComHhbCtrlr');

godComHhbCtrlr.beginCatch();

