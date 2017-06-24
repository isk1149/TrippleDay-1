const express = require('express');
const path = require('path');

const favicon = require('serve-favicon');                          // 사이트 왼쪽에 나타나는 아이콘 ex. 네이버 접속하면 초록색 N모양 아이콘
// uncomment after placing your favicon in /public


const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');            // index 페이지 import
const users = require('./routes/users');            // users 페이지 import
const testMapSearch = require('./routes/testMapSearch');   // testMapSearch 페이지 import
const testMakeGuidePlan = require('./routes/testMakeGuidePlan'); // testMakeGuidePlan 페이지 import

const app = express();

// Jade 템플릿 사용하기 어려움 ejs로 대체하자.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico'))); // 나중에 아이콘 제작하게 되면 사용할 예정

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);                              // 라우팅 http://0.0.0.0/
app.use('/users', users);                         // 라우팅 http://0.0.0.0/users
app.use('/testMapSearch', testMapSearch);         // 라우팅 http://0.0.0.0/testMapSearch  지도 검색
app.use('/testMakeGuidePlan', testMakeGuidePlan); // 라우팅 http://0.0.0.0/testMakeGuidePlan 가이드 경로 만드는 페이지


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // 사용자 모듈 만들기 기능. 현재 파일 app을 모듈화하는 것으로 다른 파일에서 app을 import해서 사용 가능.