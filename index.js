var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./lib/connection');
var employees = require('./routes/employees');
var teams = require('./routes/teams');

var app = express();

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 애플리케이션 라우트
app.use(employees);
app.use(teams);

// 404를 잡아 오류 처리기로 전달
app.use(function(req, res, next) {
  var err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// 오류 처리기

// 스택 추적을 출력하는 개발자용 오류 처리기
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// 실제 서비스용 오류 처리기
// 사용자에게 스택 추적을 유출하지 않는다.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
