/**
 * Created by heony on 2017-06-30.
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
    fs.readFile('./public/html/testFloatingTable.html', 'utf-8', function(error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' }); // 200 : 서버가 클라이언트의 요청을 정상적으로 처리함을 의미하는 코드
        res.end(data);
    });
});

module.exports = router; // exports를 통해 app.js 파일에서 var index = require('./routes/index'); 사용 가능