// 모든 데이터를 지도에 보여주기 ==> 현재 선택된 데이터를 지도에 보여주는 형식으로 전환 필요
for (let i = 0; i < coordinates.length; i++) {
  // console.log(coordinates[i].track, coordinates[i].MapCenter);
  runningCourse(coordinates[i].track, coordinates[i].MapCenter);
}

function showCourse(idx) {
  // document.getElementById("map").style.display = "none";
  runningCourse(coordinates[idx].track, coordinates[idx].MapCenter);
}

// console.log(document.getElementById("map"));

// 데이터를 바탕으로 지도에 코스를 그려주는 함수
function runningCourse(coordinates, MapCenter) {
  // 필요한 데이터 지도의 중심 좌표
  // 선을 만들 점의 좌표
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(MapCenter.lng, MapCenter.lat), // 지도의 중심좌표
      level: MapCenter.mapDepthLevel, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 지도 타입 변경 컨트롤을 생성한다
  var mapTypeControl = new kakao.maps.MapTypeControl();

  // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도에 확대 축소 컨트롤을 생성한다
  var zoomControl = new kakao.maps.ZoomControl();

  // 지도의 우측에 확대 축소 컨트롤을 추가한다
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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

  // 지도에 표시합니다
  // console.log(content);

  let map2 = document.getElementById("map");
  map2.appendChild(content);
  distanceOverlay.setMap(map);

  /////////////////////////////////////////////////////////////오버레이 드래그 /////////////////////////////////////////////

  // 커스텀 오버레이를 드래그 하기 위해 필요한
  // 드래그 시작좌표, 커스텀 오버레이의 위치좌표를 넣을 변수를 선업합니다
  var startX, startY, startOverlayPoint;

  // 커스텀 오버레이에 mousedown이벤트를 등록합니다
  addEventHandle(content, "mousedown", onMouseDown);

  // mouseup 이벤트가 일어났을때 mousemove 이벤트를 제거하기 위해
  // document에 mouseup 이벤트를 등록합니다
  addEventHandle(document, "mouseup", onMouseUp);

  // 커스텀 오버레이에 mousedown 했을 때 호출되는 핸들러 입니다
  function onMouseDown(e) {
    // 커스텀 오버레이를 드래그 할 때, 내부 텍스트가 영역 선택되는 현상을 막아줍니다.
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    var proj = map.getProjection(), // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다
      overlayPos = distanceOverlay.getPosition(); // 커스텀 오버레이의 현재 위치를 가져옵니다

    // 커스텀오버레이에서 마우스 관련 이벤트가 발생해도 지도가 움직이지 않도록 합니다
    kakao.maps.event.preventMap();

    // mousedown된 좌표를 설정합니다
    startX = e.clientX;
    startY = e.clientY;

    // mousedown됐을 때의 커스텀 오버레이의 좌표를
    // 지도 컨테이너내 픽셀 좌표로 변환합니다
    startOverlayPoint = proj.containerPointFromCoords(overlayPos);

    // document에 mousemove 이벤트를 등록합니다
    addEventHandle(document, "mousemove", onMouseMove);
  }

  /////////////////////////////////////////// 출발 마커 ////////////////////////////////////////////////
  var startMarker =
    coordinates[0].lng === coordinates[coordinates.length - 1].lng
      ? new kakao.maps.Point(15, 70)
      : new kakao.maps.Point(15, 45);

  var startSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png", // 출발 마커이미지의 주소입니다
    startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
    startOption = {
      // offset: new kakao.maps.Point(5, 45), // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
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
    arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
    arriveOption = {
      offset: new kakao.maps.Point(15, 45), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
      // offset: new kakao.maps.Point(-5, 45), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
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

  /////////////////////////////////////////////////// 함수 속 함수 ////////////////////////////////////////////
  // 커스텀 오버레이에 mousedown 한 상태에서
  // mousemove 하면 호출되는 핸들러 입니다
  function onMouseMove(e) {
    // 커스텀 오버레이를 드래그 할 때, 내부 텍스트가 영역 선택되는 현상을 막아줍니다.
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    var proj = map.getProjection(), // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다
      deltaX = startX - e.clientX, // mousedown한 픽셀좌표에서 mousemove한 좌표를 빼서 실제로 마우스가 이동된 픽셀좌표를 구합니다
      deltaY = startY - e.clientY,
      // mousedown됐을 때의 커스텀 오버레이의 좌표에 실제로 마우스가 이동된 픽셀좌표를 반영합니다
      newPoint = new kakao.maps.Point(
        startOverlayPoint.x - deltaX,
        startOverlayPoint.y - deltaY
      ),
      // 계산된 픽셀 좌표를 지도 컨테이너에 해당하는 지도 좌표로 변경합니다
      newPos = proj.coordsFromContainerPoint(newPoint);

    // 커스텀 오버레이의 좌표를 설정합니다
    distanceOverlay.setPosition(newPos);
  }

  // mouseup 했을 때 호출되는 핸들러 입니다
  function onMouseUp(e) {
    // 등록된 mousemove 이벤트 핸들러를 제거합니다
    removeEventHandle(document, "mousemove", onMouseMove);
  }

  // target node에 이벤트 핸들러를 등록하는 함수힙니다
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      console.log(target);
      target.attachEvent("on" + type, callback);
    }
  }

  // target node에 등록된 이벤트 핸들러를 제거하는 함수힙니다
  function removeEventHandle(target, type, callback) {
    if (target.removeEventListener) {
      target.removeEventListener(type, callback);
    } else {
      target.detachEvent("on" + type, callback);
    }
  }
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

  return contentContainer;
}

// // 오버레이 안보이게
// function hide() {
//   document
//     .querySelectorAll(
//       "#map > div:nth-child(19) > div > div:nth-child(6) > div:nth-child(2n-1) > div"
//     )
//     .forEach((elm) => (elm.style.display = "none"));
// }

// // 오버레이 보이게
// function uncover() {
//   document
//     .querySelectorAll(
//       "#map > div:nth-child(19) > div > div:nth-child(6) > div:nth-child(2n-1) > div"
//     )
//     .forEach((elm) => (elm.style.display = "block"));
// }

// 오버레이 토글
function toggleBtn() {
  document
    .querySelectorAll(
      "#map > div:nth-child(n) > div > div:nth-child(6) > div:nth-child(n) > div"
    )
    .forEach((elm) => elm.classList.toggle("toggle"));
}
// #map > div:nth-child(22) > div > div:nth-child(6) > div:nth-child(2n-1) > div
// "#map > div:nth-child(19) > div > div:nth-child(6) > div:nth-child(2n-1) > div"
//#map > div:nth-child(22) > div > div:nth-child(6) > div:nth-child(12) > div
