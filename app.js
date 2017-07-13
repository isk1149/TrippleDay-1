const express = require('express');
const path = require('path');

const logger = require('morgan');              // 로그 관련..?
const favicon = require('serve-favicon');      // 사이트 왼쪽에 나타나는 아이콘 ex. 네이버 접속하면 초록색 N모양 아이콘
const bodyParser = require('body-parser');     // post방식으로 요청할때 데이터를 파싱하기 위한 모듈
const cookieParser = require('cookie-parser'); // 쿠키 파싱

const index = require('./routes/index');                         // index 페이지 import
const testMapSearch = require('./routes/testMapSearch');         // testMapSearch 페이지 import
const testMakeGuidePlan = require('./routes/testMakeGuidePlan'); // testMakeGuidePlan 페이지 import
const testFloatingTable = require('./routes/testFloatingTable'); // testFloatingTable 페이지 import

const app = express();

// Jade 템플릿 사용하기 어려움 ejs로 대체해야함.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// 아직 안 쓰는 부분.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//===============//
// 파일 path 단축 // html에서 Bootstrap 로드할때 단축된 path를 써서 로드 가능.
//===============//
app.use('/moment', express.static(__dirname + '/node_modules/moment/min'));
app.use('/bootstrap/dist', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/bootstrap-datepicker', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist'));


//==============//
// 페이지 라우팅 //
//==============//
app.use('/', index);                              // 라우팅 http://0.0.0.0/
app.use('/testMapSearch', testMapSearch);         // 라우팅 http://0.0.0.0/testMapSearch  지도 검색
app.use('/testMakeGuidePlan', testMakeGuidePlan); // 라우팅 http://0.0.0.0/testMakeGuidePlan 가이드 경로 만드는 페이지
app.use('/testFloatingTable', testFloatingTable); // 라우팅 http://0.0.0.0/testFloatingTable

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