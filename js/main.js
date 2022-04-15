/*
        choice-items를 클릭하면 choice-text와 choice-items가 바뀐다.
        마지막 결정하면 choice를 result로 바꾸고 결과를 출력한다. 
        */

//변수 선언
const questionCount = 3; // 질문갯수;

let choiceText = document.querySelector(".choice-text > h1");
let backBtn = document.querySelector(
  "main .container .choice .choice-text button"
);

let choiceBox = document.querySelector(".choice-box");
let choiceItems = document.querySelectorAll(".choice-items");
let choiceItems1 = document.querySelector(
  ".choice-box > .choice-items:nth-child(1)"
);
let choiceItems2 = document.querySelector(
  ".choice-box > .choice-items:nth-child(2)"
);
let choiceItems3 = document.querySelector(
  ".choice-box > .choice-items:nth-child(3)"
);

let choiceResult = document.querySelector(".choice-result");
let resultBox = [];

let choiceBtn = document.querySelector(".choice-btn");

let progressText = document.querySelector("footer .progress .progress-text");
let progressImage = document.querySelector(
  "footer .progress .progress-bar .progress-image"
);

const choice = document.querySelector("main .container .choice");

choice.dataset.index = 1; // 초기값

progressImage.style.width = `${((choice.dataset.index * 1) / 3) * 100}%`; // 초기값

// choice-items를 클릭하면 choice-text와 choice-items가 바뀐다.
for (let i = 0; i < choiceItems.length; i++) {
  choiceItems[i].addEventListener("click", () => {
    switch (choice.dataset.index * 1) {
      case 1:
        //내용변경
        choiceText.innerText = "계절을 선택하세요";
        choiceItems1.innerText = "봄";
        choiceItems2.innerText = "여름";
        choiceItems3.innerText = "가을";

        //뒤로가기버튼 생성
        backBtn.style.display = "block";

        //결과에 클릭한 값을 입력
        resultBox.push(choiceItems[i].innerText);

        //다음 문제로 넘어가기
        choice.dataset.index = choice.dataset.index * 1 + 1;

        //진행도 체크
        progressText.innerText = `${choice.dataset.index} / 3`;
        progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;

        break;

      case 2:
        //내용변경
        choiceText.innerText = "취향을 선택하세요";
        choiceItems1.innerText = "조용한곳";
        choiceItems2.innerText = "사람많은곳";
        choiceItems3.innerText = "적당한곳";

        progressText.innerText = "3 / 3";
        progressImage.style.width = `${(3 / 3) * 100}%`;

        resultBox.push(choiceItems[i].innerText);

        choice.dataset.index = choice.dataset.index * 1 + 1;

        progressText.innerText = `${choice.dataset.index} / 3`;
        progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;
        break;

      case 3:
        resultBox.push(choiceItems[i].innerText);

        //뒤로가기버튼 삭제
        backBtn.style.display = "none";

        //결과출력
        choiceText.innerText = "당신의 결과는??";
        choiceBox.style.display = "none";
        // choiceResult.style.display = "block";

        choiceResult.innerHTML = `<div id="map" style="width:750px;height:350px;"></div>`;
        map();
        let newDiv = document.createElement("div");
        choiceResult.append(newDiv);

        document.querySelector(
          ".choice-result > div:nth-child(2)"
        ).innerHTML = `<h1>결과는 : ${resultBox} <br>kakaomap</h1>`;

        document.querySelector("header").style.visibility = "hidden";
        document.querySelector("footer").style.visibility = "hidden";

        //다시하기버튼
        choiceBtn.style.display = "block";
        break;
    }
  });
}

console.log(resultBox);

// 다시하기를 누르면 일어나는 일
document
  .querySelector(".choice-btn > button:nth-child(1)")
  .addEventListener("click", () => {
    // 순번 초기화
    choice.dataset.index = 1;

    // 질문 내용 초기화
    choiceText.innerText = "난이도를 선택하세요";
    choiceItems1.innerText = "하";
    choiceItems2.innerText = "중";
    choiceItems3.innerText = "상";

    // 선택박스 초기화
    choiceBox.style.display = "flex";
    choiceResult.innerHTML = "";

    // 결과박스 초기화
    resultBox = [];
    choiceBtn.style.display = "none";

    // 진행박스 초기화
    progressText.innerText = `${choice.dataset.index} / 3`;
    progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;

    document.querySelector("header").style.visibility = "visible";
    document.querySelector("footer").style.visibility = "visible";
  });

// 뒤로가기를 누르면 일어나는 일
backBtn.addEventListener("click", () => {
  //순번을 뒤로 미룬다.
  choice.dataset.index = choice.dataset.index * 1 - 1;
  resultBox.pop();
  switch (choice.dataset.index * 1) {
    case 1:
      //내용변경
      choiceText.innerText = "난이도를 선택하세요";
      choiceItems1.innerText = "하";
      choiceItems2.innerText = "중";
      choiceItems3.innerText = "상";

      //뒤로가기버튼 삭제
      backBtn.style.display = "none";

      //진행도 갱신
      progressText.innerText = `${choice.dataset.index} / 3`;
      progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;

      break;

    case 2:
      //내용변경
      choiceText.innerText = "계절을 선택하세요";
      choiceItems1.innerText = "봄";
      choiceItems2.innerText = "여름";
      choiceItems3.innerText = "가을";

      progressText.innerText = `${choice.dataset.index} / 3`;
      progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;
      break;

    case 3:
      //내용변경
      choiceText.innerText = "취향을 선택하세요";
      choiceItems1.innerText = "조용한곳";
      choiceItems2.innerText = "사람많은곳";
      choiceItems3.innerText = "적당한곳";

      progressText.innerText = `${choice.dataset.index} / 3`;
      progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;

      break;
  }
});
/* 추가로 해야할것? 
        1. display:flex를 너무 많이씀 
        2. display: none을 너무 많이씀 에초에 안보이게 하지말고 결과창에서 생겨나게 하는것도 방법
        3. 디자인
        4. 스토리, 기획, 사진, 선택지 등 아이디어
        5. 결과박스를 리스트로 할 것인지, 결과를 뽑아내는 로직을 어떻게 할지 생각
        */

function map() {
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.55795, 126.89761), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

  // 지도를 생성한다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 지도에 확대 축소 컨트롤을 생성한다
  var zoomControl = new kakao.maps.ZoomControl();

  // 지도의 우측에 확대 축소 컨트롤을 추가한다
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 지도에 마커를 생성하고 표시한다
  var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.55795, 126.89761), // 마커의 좌표
    draggable: true, // 마커를 드래그 가능하도록 설정한다
    map: map, // 마커를 표시할 지도 객체
  });

  // 커스텀 오버레이를 생성하고 지도에 표시한다
  var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div style="padding:0 5px;background:#fff;">망원체육공원</div>',
    position: new kakao.maps.LatLng(37.55795, 126.89761), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 3, // 컨텐츠의 y 위치
  });
}
