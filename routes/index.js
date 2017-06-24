var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var sampleIndex = `
    <!DOCTYPE html>
    <html>
        <head> 
            <style> 
                #map {
                    height: 400px;
                    width: 600px;
                }
            </style>
            <link rel="stylesheet" href="/stylesheets/style.css">
        </head>
        <body>
            <h3>Tripple 테스트 SKT타워</h3>
            <div id="map"></div>
            <script>
                <!-- initMap() 지도 초기화 -->
                <!-- latitude : 위도 longitude : 경도 -->
                <!-- getElementById : id="map"인 div를 찾음 -->
                <!-- zoom : 0은 세계 전체이고 값이 높아질 수록 확대 -->
                
                function initMap() {
                var uluru = {lat: 37.566452, lng: 126.985025}; <!-- latitude:위도 longitude:경도 -->
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 16,
                    center: uluru
                });
                
                <!-- 마커 생성 -->
                var market = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            }
            </script>
            <!-- 구글 지도 API 로드, callback 함수로 initMap -->
            <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDz1gbjauHDfo2HwoRGo5sVUsV0Hi-dOXA&callback=initMap">
            </script>
        </body>
    </html>`;
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); // 200 : 서버가 클라이언트의 요청을 정상적으로 처리함을 의미하는 코드
    res.write(sampleIndex);
    res.end();
});

module.exports = router; // exports를 통해 app.js 파일에서 var index = require('./routes/index'); 사용 가능