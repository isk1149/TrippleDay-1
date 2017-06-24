/**
 * Created by heony on 2017-06-21.
 */
const express = require('express');
const router = express.Router();


// testmapSearch 파일의 지도 주소 자동완성 기능 -> Places 라이브러리 사용
// Places 라이브러리는 Places API 사용하는 라이브러리와 같음.
// Searchbox에 장소입력하면 목록이 뜸.
// 그 목록 중 하나를 선택하면 해당 위치로 지도의 뷰가 이동
// testMapSearch에서 장소 목록 중 하나를 선택할 때 icon, 이름, 위치등의 정보만 가져옴
// place id 값을 구해야함.
// 가이드 루트 만드는 화면에 선택한 장소를 보여주기 위해서 2가지 방법이 존재
// 1. 장소 목록 중 하나를 선택할 때 http request를 날려서 Json을 받아서 전달하는 방법
// 2. place id 값만 전달하고 루트 만드는 화면에서 이 값을 토대로 http request 요청
// 2번째 방법을 찾아 보는중.

/* GET home page. */
// router.post('/', function(req, res, next) {
//    http.request(req.value, function(req, res) {
//        res.
//    }) ;
// });

router.get('/', function (req, res, next) {
    const sampleIndex =`
    <!DOCTYPE html>
<html>
<head>
   <title></title>
   <script>
      function button(){
         var output = document.getElementById('text').value;
         var placeSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + output + "key=AIzaSyC8LpNbBU9HzrdyY4i2O8zveS0dUrcIqsk";
         
         var field = document.getElementById('add');
         field.innerHTML += "<li>"+output+"</li>";
      }
   </script>
</head>
<body>
   <div>
      <input id="text" type="text">
      <button onclick="button()">추가</button>
   </div></br>
   <div>
   <ul id="add">
   </ul>
   <div>
</body>
</html>`;

    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); // 200 : 서버가 클라이언트의 요청을 정상적으로 처리함을 의미하는 코드
    res.write(sampleIndex);
    res.end();
});

module.exports = router; // exports를 통해 app.js 파일에서 var index = require('./routes/index'); 사용 가능