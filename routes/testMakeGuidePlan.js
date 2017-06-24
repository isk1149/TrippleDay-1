/**
 * Created by heony on 2017-06-21.
 */
const express = require('express');
const router = express.Router();

// 지도 주소 자동완성 기능 -> Places 라이브러리 사용
// Places 라이브러리는 Places API 사용하는 라이브러리와 같음.
// Searchbox에 장소입력하면 목록이 뜸.
// 그 목록 중 하나를 선택하면 해당 위치로 지도의 뷰가 이동하고 마커가 표시됨.
// 선택된 장소의 Json은 Google Place API의 장소 세부정보 참고하면 됨.
// place id 값을 구해야함. => (구했음!)
// 가이드 루트 만드는 화면에 선택한 장소를 보여줘야함.

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
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Places Searchbox</title>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 600px;
        width: 800px;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 600px;
        width: 800px;
        margin: 0;
        padding: 0;
      }
      .controls {
        margin-top: 10px;
        border: 1px solid transparent;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 32px;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }

      #pac-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 300px;
      }

      #pac-input:focus {
        border-color: #4d90fe;
      }

      .pac-container {
        font-family: Roboto;
      }

      #type-selector {
        color: #fff;
        background-color: #4d90fe;
        padding: 5px 11px 0px 11px;
      }

      #type-selector label {
        font-family: Roboto;
        font-size: 13px;
        font-weight: 300;
      }
      #target {
        width: 345px;
      }
    </style>
  </head>
  <body>
    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="map"></div>
    
    <div><ul id="add_placeid"></ul></div> <!-- 헌영 추가-->
    <div id="add_photo"></div> <!-- 헌영 추가-->
    
    <script>
      // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            
            // 최종 목표 : 장소 검색하면 장소 정보와 경로 추가버튼 삽입 - 인성
            //            경로 추가 버튼 클릭시 해당 장소에 대한 정보(이미지, 이름, 위치) 등이 가이드 여행경로 화면에 전달
            //            장소 세부정보 Json에 이미지, 이름, 위치 등의 세부정보 있음.
            //            루트 만드는 화면에 추가시키는 것이 목표
            
            // Google Place API에서 주변검색, 텍스트검색은 1개의 사진만 제공.
            // 세부정보요청은 최대 10개의 사진 제공.(현재 세부정보요청 사용중)
            
            // place가 장소검색을 하고 선택된 장소에 정보를 담고있는 Json 객체임.
            // https://developers.google.com/places/web-service/search 에서 검색 응답 부분 보면 Json 구조 파악 가능.
            // place.name은 장소에 대한 이름으로 '경복궁' '서울역' 이런 것들
            // place.place_id는 해당 장소에 대한 고유 id
            // 장소 사진에 대한 참고는 https://developers.google.com/places/web-service/photos
            // photo_reference 구하려면 place.photos[].getUrl({'maxWidth':000, 'maxHeight':000}); 호출 
            
            // place_id 출력하는 부분
            var placeInfo = place.name + "의 place_id = " + place.place_id;
            var placefield = document.getElementById('add_placeid');
            placefield.innerHTML += "<li>" + placeInfo + "</li>";
                                    
            // 장소 사진 출력하는 부분                                    
            var photoUrl = place.photos[0].getUrl({'maxWidth':120, 'maxHeight':120});
            var photofield = document.getElementById('add_photo');
            photofield.innerHTML += "<img src=\'" + photoUrl + "\'>";                            
            
            // 기존의 icon으로 기차역을 검색하면 기차역 icon을 저장한다.
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // 마커를 표시하는 함수
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              //icon: icon,   // 기존의 마크 대신
              icon: photoUrl, // 해당 장소에 대한 사진을 마커로 씀.
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDz1gbjauHDfo2HwoRGo5sVUsV0Hi-dOXA&libraries=places&callback=initAutocomplete"
         async defer></script>
  </body>
</html>`;

    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); // 200 : 서버가 클라이언트의 요청을 정상적으로 처리함을 의미하는 코드
    res.write(sampleIndex);
    res.end();
});

module.exports = router; // exports를 통해 app.js 파일에서 var index = require('./routes/index'); 사용 가능