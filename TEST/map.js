// 모든 데이터를 지도에 보여주기 ==> 현재 선택된 데이터를 지도에 보여주는 형식으로 전환 필요
for (let i = 0; i < coordinates.length; i++) {
  // console.log(coordinates[i].track, coordinates[i].MapCenter);
  runningCourse(coordinates[i].track, coordinates[i].MapCenter);
}

// 데이터를 바탕으로 지도에 코스를 그려주는 함수
function runningCourse(coordinates, MapCenter) {
  // 필요한 데이터 지도의 중심 좌표
  // 선을 만들 점의 좌표
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(MapCenter.lng, MapCenter.lat), // 지도의 중심좌표
      level: 6, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
  var linePath = []; // 러닝 코스

  // 모든 좌표 점찍기
  for (let i = 0; i < coordinates.length; i++) {
    var circleOverlay = new kakao.maps.CustomOverlay({
      content: '<span class="dot"></span>',
      position: new kakao.maps.LatLng(coordinates[i].lng, coordinates[i].lat),
      zIndex: 1,
    });

    // 모든 좌표를 러닝 코스가 입력
    linePath.push(
      new kakao.maps.LatLng(coordinates[i].lng, coordinates[i].lat)
    );

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "red", // 선의 색깔입니다
      strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 현재 좌표까지의 거리
    let distance = Math.round(polyline.getLength());

    // 현재 좌표의 이름
    let spotName = coordinates[i].coordinatesName;

    // 현재 좌표에 거리, 이름 표시
    distanceOverlay = new kakao.maps.CustomOverlay({
      map: map, // 커스텀오버레이를 표시할 지도입니다
      content:
        '<div class="dotOverlay">' +
        `<div style="text-align:center">` +
        spotName +
        `</div>` +
        `거리 <span class="number">` +
        distance / 1000 +
        `</span> km</div>`, // 커스텀오버레이에 표시할 내용입니다
      position: new kakao.maps.LatLng(coordinates[i].lng, coordinates[i].lat), // 커스텀오버레이를 표시할 위치입니다.
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3,
    });
    // 지도에 표시합니다

    circleOverlay.setMap(map);
  }

  // 지도에 선을 표시합니다
  polyline.setMap(map);

  var distance = Math.round(polyline.getLength()), // 선의 총 거리를 계산합니다
    content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

  distanceOverlay = new kakao.maps.CustomOverlay({
    map: map, // 커스텀오버레이를 표시할 지도입니다
    content: content, // 커스텀오버레이에 표시할 내용입니다
    position: new kakao.maps.LatLng(
      coordinates[coordinates.length - 1].lng,
      coordinates[coordinates.length - 1].lat
    ), // 커스텀오버레이를 표시할 위치입니다.
    xAnchor: 0,
    yAnchor: 0,
    zIndex: 3,
  });

  // 지도에 표시합니다
  distanceOverlay.setMap(map);

  //////////////////////////////////////////////////// 그냥 좌표 따려고 만듦 ///////////////////////////////////////////////////////////////////

  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    // 마우스로 클릭한 위치입니다
    var clickPosition = mouseEvent.latLng;
    // 위도, 경도
    let [latitude, longitude] = [clickPosition.Ma, clickPosition.La];
    //   console.log(clickPosition);
    console.log("latitude", latitude);
    console.log("longitude", longitude);
  });
}
////////////////////////////////////////////// 완성 함수 /////////////////////////////////////////

// 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다

function getTimeHTML(distance) {
  // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
  var walkkTime = (distance / 67) | 0;
  var walkHour = "",
    walkMin = "";

  // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
  if (walkkTime > 60) {
    walkHour =
      '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
  }
  walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

  // 달리기 평균 시속은 10km/h 이고 이것을 기준으로 달리기 분속은 167m/min입니다
  var runningTime = (distance / 167) | 0;
  var runningHour = "",
    bycicleMin = "";

  // 계산한 달리기 시간이 60분 보다 크면 시간으로 표출합니다
  if (runningTime > 60) {
    runningHour =
      '<span class="number">' + Math.floor(runningTime / 60) + "</span>시간 ";
  }
  runningMin = '<span class="number">' + (runningTime % 60) + "</span>분";

  distance = distance / 1000;
  // 거리와 도보 시간, 달리기 시간을 가지고 HTML Content를 만들어 리턴합니다
  var content = '<ul class="dotOverlay distanceInfo">';
  content += "    <li>";
  content +=
    '        <span class="label">총거리</span><span class="number">' +
    distance +
    " </span>km";
  content += "    </li>";
  content += "    <li>";
  content += '        <span class="label">도보</span>' + walkHour + walkMin;
  content += "    </li>";
  content += "    <li>";
  content +=
    '        <span class="label">달리기</span>' + runningHour + runningMin;
  content += "    </li>";
  content += "    <li>";
  content += '        <span class="label">*** 10km/h 기준 ***</span>';
  content += "    </li>";
  content += "</ul>";

  return content;
}
