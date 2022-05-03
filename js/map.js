// 인덱스의 코스데이터를 불러와서 보여주는 함수
function showCourse(idx) {
  runningCourse(coordinates[idx].track, coordinates[idx].MapCenter);
}

var map = "";

// 데이터를 바탕으로 지도에 코스를 그려주는 함수
function runningCourse(coordinates, MapCenter) {
  /* 지도 생성 */
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(MapCenter.lng, MapCenter.lat), // 지도의 중심좌표
      level: MapCenter.mapDepthLevel, // 지도의 확대 레벨
    };

  map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  /* 컨트롤 추가 */
  // 지도 타입 변경 컨트롤을 생성한다
  var mapTypeControl = new kakao.maps.MapTypeControl();

  // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도에 확대 축소 컨트롤을 생성한다
  var zoomControl = new kakao.maps.ZoomControl();

  // 지도의 우측에 확대 축소 컨트롤을 추가한다
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  /* 러닝 코스 점찍고, 선연결 */
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
      strokeWeight: 7, // 선의 두께 입니다
      strokeColor: "red", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "shortdash", // 선의 스타일입니다
    });

    // 현재 좌표까지의 거리
    let distance = Math.round(polyline.getLength());

    // 현재 좌표의 이름
    let spotName = coordinates[i].coordinatesName;

    // 현재 좌표에 거리, 이름 표시
    if (coordinates[i].display === "y") {
      // display가 y일때만 오버레이 표시
      distanceOverlay = new kakao.maps.CustomOverlay({
        map: map, // 커스텀오버레이를 표시할 지도입니다
        content:
          '<div class="dotOverlay">' +
          `<div style="text-align:center">` +
          spotName +
          `</div>` +
          `거리 <span class="number">` +
          Math.round((distance / 1000) * 10) / 10 +
          `</span> km</div>`, // 커스텀오버레이에 표시할 내용입니다
        position: new kakao.maps.LatLng(coordinates[i].lng, coordinates[i].lat), // 커스텀오버레이를 표시할 위치입니다.
        xAnchor: 0,
        yAnchor: 0,
        zIndex: 3,
      });
      // 지도에 표시합니다
      circleOverlay.setMap(map);
    }
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
  // 지도에 커스텀오버레이를 표시합니다
  distanceOverlay.setMap(map);

  /* 총거리, 소요시간 오버레이 생성 */
  mapContainer.appendChild(content);

  /* 오버레이 토글버튼 생성 */
  let overlayToggleBtn = `<button id="toggle_btn" class="overlay_toggle_btn" onclick="toggleBtn()">`;
  overlayToggleBtn += `거점 숨기기/보이기`;
  overlayToggleBtn += `</button>`;

  let overlayToggleBtnContainer = document.createElement("article");
  overlayToggleBtnContainer.innerHTML = overlayToggleBtn;

  mapContainer.appendChild(overlayToggleBtnContainer);

  /* 현위치 버튼 생성 */
  let currentLocationBtn = `<button class='current_location_btn' onclick='currentLocation()'>`;
  currentLocationBtn += `<i class="fa-solid fa-location-crosshairs"></i>`;
  currentLocationBtn += `</button>`;

  let currentLocationContainer = document.createElement("div");
  currentLocationContainer.innerHTML = currentLocationBtn;

  mapContainer.appendChild(currentLocationContainer);

  /* 출발,도착 마커 */
  var startMarker =
    coordinates[0].lng === coordinates[coordinates.length - 1].lng
      ? new kakao.maps.Point(15, 70)
      : new kakao.maps.Point(15, 45);

  var startSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png", // 출발 마커이미지의 주소입니다
    // var startSrc =
    //     "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/blue_b.png", // 출발 마커이미지의 주소입니다
    startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
    startOption = {
      offset: startMarker, // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
    };

  // 출발 마커 이미지를 생성합니다
  var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

  // 출발 마커가 표시될 위치입니다
  var startPosition = new kakao.maps.LatLng(
    coordinates[0].lng,
    coordinates[0].lat
  );

  // 출발 마커를 생성합니다
  var startMarker = new kakao.maps.Marker({
    map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
    position: startPosition,
    image: startImage, // 출발 마커이미지를 설정합니다
  });

  startMarker.setImage(startImage);

  var arriveSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png", // 도착 마커이미지 주소입니다
    // var arriveSrc =
    //     "https: //t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/blue_b.png", // 도착 마커이미지 주소입니다
    arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
    arriveOption = {
      offset: new kakao.maps.Point(15, 45), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
    };

  // 도착 마커 이미지를 생성합니다
  var arriveImage = new kakao.maps.MarkerImage(
    arriveSrc,
    arriveSize,
    arriveOption
  );

  // 도착 마커가 표시될 위치입니다
  var arrivePosition = new kakao.maps.LatLng(
    coordinates[coordinates.length - 1].lng,
    coordinates[coordinates.length - 1].lat
  );
  // 도착 마커를 생성합니다
  var arriveMarker = new kakao.maps.Marker({
    map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
    position: arrivePosition,
    image: arriveImage, // 도착 마커이미지를 설정합니다
  });

  arriveMarker.setImage(arriveImage);

  // 출발 마커, 도착 마커의 z-index 조정
  document.querySelector(
    "#map > div:nth-child(1) > div > div:nth-child(6) > div:nth-last-child(2)"
  ).style.zIndex = 3;
  document.querySelector(
    "#map > div:nth-child(1) > div > div:nth-child(6) > div:nth-last-child(1)"
  ).style.zIndex = 4;

  // toggleBtn();
}

/* 완성 함수 */

// 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance) {
  // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
  var walkTime = (distance / 67) | 0;
  var walkHour = "",
    walkMin = "";

  // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
  if (walkTime > 60) {
    walkHour =
      '<span class="number">' + Math.floor(walkTime / 60) + "</span>시간 ";
  }
  walkMin = '<span class="number">' + (walkTime % 60) + "</span>분";

  // 달리기 평균 시속은 10km/h 이고 이것을 기준으로 달리기 분속은 167m/min입니다
  var runningTime = (distance / 167) | 0;
  var runningHour = "",
    runningMin = "";

  // 계산한 달리기 시간이 60분 보다 크면 시간으로 표출합니다
  if (runningTime > 60) {
    runningHour =
      '<span class="number">' + Math.floor(runningTime / 60) + "</span>시간 ";
  }
  runningMin = '<span class="number">' + (runningTime % 60) + "</span>분";

  distance = Math.round((distance / 1000) * 100) / 100;
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
  content += "        <span>** 10km/h 기준 **</span>";
  content += "    </li>";
  content += "</ul>";

  var contentContainer = document.createElement("article");
  contentContainer.innerHTML = content;

  // 모바일 결과페이지 추가
  var courseTimeInfo = '<ul class="courseTimeInfo">';
  courseTimeInfo += "    <li>";
  courseTimeInfo +=
    '        <span class="label">거리<br></span><span class="number">' +
    distance +
    " </span>km";
  courseTimeInfo += "    </li>";
  courseTimeInfo += "    <li>";
  courseTimeInfo +=
    '        <span class="label">도보<br></span>' +
    // <i class="fa-solid fa-person-walking"></i>
    walkHour +
    walkMin;
  courseTimeInfo += "    </li>";
  courseTimeInfo += "    <li>";
  courseTimeInfo +=
    '        <span class="label">러닝(10km/h)<br></span>' +
    //<i class="fa-solid fa-person-running"></i>
    runningHour +
    runningMin;
  courseTimeInfo += "</ul>";

  document.querySelector(".result_text").innerHTML = courseTimeInfo;

  return contentContainer;
}
toggleBtn();

// 오버레이 토글
function toggleBtn() {
  document
    .querySelectorAll(
      "#map > div:nth-child(n) > div > div:nth-child(6) > div:nth-child(n) > div"
    )
    .forEach((elm) => elm.classList.toggle("toggle"));
}

/* 현위치 버튼 */
let la = 0; // 현재 위도
let lo = 0; // 현재 경도

const options = {
  enableHighAccuracy: true, // 실제 위치와의 오차 - 단위 M
  timeout: 5000, // 위치를 반환하는데 걸리는 최대시간 (5초)
  maximumAge: 0, // 항상 실시간 위치정보를 가져옴
};

//
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error, options);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function showPosition(position) {
  ac = Math.floor(position.coords.accuracy);
  la = position.coords.latitude;
  lo = position.coords.longitude;
  // 지도이동
  // setCenter();
  panTo();
  // 마커 및 말풍선 생성
  // const text = "마포청년일자리센터";
  // myMarker(text);
  currentMarker();
}

function setCenter() {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(la, lo);

  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}
function currentLocation() {
  // 현위치 찾기
  getLocation();
}

function panTo() {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(la, lo);

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
}

function currentMarker() {
  // 마커가 표시될 위치입니다

  var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
    // var imageSrc = "./../img/circle-dot-solid.svg", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(25, 25), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(10, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    ),
    markerPosition = new kakao.maps.LatLng(la, lo); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
  });
  marker.setMap(null);
  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
}
