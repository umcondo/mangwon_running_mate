/*
        choice-items를 클릭하면 choice-text와 choice-items가 바뀐다.
        마지막 결정하면 choice를 result로 바꾸고 결과를 출력한다. 
        */

/* 첫페이지 */
document.querySelector(".first__page button").addEventListener("click", () => {
  document.querySelector(".first__page").style.display = "none";
});

//변수 선언

let choiceText = document.querySelector(".choice-text > h1"); // 질문제목

let backBtn = document.querySelector(".back_btn"); // 뒤로가기 버튼

let choiceBox = document.querySelector(".choice-box"); // 답변내용 담은 div
let choiceItems = document.querySelectorAll(".choice-items"); // 답변내용들
let choiceItems1 = document.querySelector(
  ".choice-box > .choice-items:nth-child(1)" // 답변내용1
);
let choiceItems2 = document.querySelector(
  ".choice-box > .choice-items:nth-child(2)" // 답변내용2
);

let choiceResult = document.querySelector(".choice-result"); //결과

let resultBox = []; // 답변을 모아두는 박스

let choiceBtn = document.querySelector(".choice-btn"); // 다시하기버튼

let progressText = document.querySelector("header .progress .progress-text"); // 진행바텍스트
let progressImage = document.querySelector(
  "header .progress .progress-bar .progress-image" // 진행바
);

const choice = document.querySelector("main .container .choice"); //질문,답변 전체 div

choice.dataset.index = 1; // choice div의 클래스 data-index 초기값

/*   질문   */
const questionCount = Question.length; // 질문갯수;

let currentIndex = 0; // 현재 질문의 인덱스, 초기값 : 0

// console.log(curId, curTitle, curAnswer1, curAnswer2);

// 현재 인덱스의 질문, 내용을 보여주는 함수
const makeQuestion = (idx) => {
  let currentQuestion = Question[idx]; // 현재 질문 객체

  // let curId = currentQuestion.id;
  let curTitle = currentQuestion.question;
  let curAnswer1 = currentQuestion.answer1;
  let curAnswer2 = currentQuestion.answer2;

  let choiceText = document.querySelector(".choice-text > h1"); // 질문제목
  let choiceItems1 = document.querySelector(
    ".choice-box > .choice-items:nth-child(1)" // 답변내용1
  );
  let choiceItems2 = document.querySelector(
    ".choice-box > .choice-items:nth-child(2)" // 답변내용2
  );

  choiceText.innerHTML = curTitle;
  choiceItems1.innerHTML = curAnswer1;
  choiceItems2.innerHTML = curAnswer2;
};

const showQuestion = () => {
  // 질문, 내용을 보여주는 함수
};

const nextQuestion = () => {
  currentIndex++;
  // 질문 내용 선택시 질문값을 저장하고 다음 질문을 보여주는 함수
  if (currentIndex < questionCount) {
    // 현재 인덱스가 질문 수와 같아지면 결과페이지 출력
    makeQuestion(currentIndex);
  } else {
    // 결과페이지
  }
};

// 질문 진행에 따라 진행도를 보여주는 함수
const progressBar = () => {
  let progressText = document.querySelector("header .progress .progress-text"); // 진행바텍스트
  let progressImage = document.querySelector(
    "header .progress .progress-bar .progress-image" // 진행바
  );
  progressImage.style.width = `${(currentIndex / questionCount) * 100}%`; // 진행바
  progressText.innerHTML = `${currentIndex} / ${questionCount}`; // 진행도
};

// 뒤로가기 버튼을 누르면 실행되는 함수, 이전 질문을 보여주고, 질문결과의 마지막 값을 제거한다.
const backwardBtn = () => {
  currentIndex--;
  makeQuestion(currentIndex);

  resultBox.pop();
};

progressImage.style.width = `${
  ((choice.dataset.index * 1) / questionCount) * 100
}%`; // 진행바

// choice-items를 클릭하면 choice-text와 choice-items가 바뀐다.
for (let i = 0; i < choiceItems.length; i++) {
  choiceItems[i].addEventListener("click", () => {
    switch (choice.dataset.index * 1) {
      case 1:
        //내용변경
        choiceText.innerText = "계절을 선택하세요";
        choiceItems1.innerText = "봄";
        choiceItems2.innerText = "여름";

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

        progressText.innerText = "3 / 3";
        progressImage.style.width = `${(3 / 3) * 100}%`;

        resultBox.push(choiceItems[i].innerText);

        choice.dataset.index = choice.dataset.index * 1 + 1;

        progressText.innerText = `${choice.dataset.index} / 3`;
        progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;
        break;

      case 3:
        resultBox.push(choiceItems[i].innerText);

        // 진행바 삭제
        document.querySelector("header").style.display = "none";

        //뒤로가기버튼 삭제
        backBtn.style.display = "none";

        //결과출력
        // choiceText.innerText = "당신의 결과는??";
        // choiceBox.style.display = "none";
        choice.style.display = "none";
        document.querySelector(".result").style.display = "flex";

        choiceResult.innerHTML = `<div id="map" style="width:750px;height:350px;"></div>`;
        map();
        let newDiv = document.createElement("div");
        choiceResult.append(newDiv);

        document.querySelector(
          ".choice-result > div:nth-child(2)"
        ).innerHTML = `<h1>결과는 : ${resultBox} <br>kakaomap</h1>`;

        //다시하기버튼
        choiceBtn.style.display = "block";
        break;
    }
  });
}

// console.log(resultBox);

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

    // 선택박스 초기화
    choiceBox.style.display = "flex";
    choiceResult.innerHTML = "";

    // 결과박스 초기화
    resultBox = [];
    choiceBtn.style.display = "none";

    // 진행박스 초기화
    progressText.innerText = `${choice.dataset.index} / 3`;
    progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;

    // 질문, 진행박스 보이게
    choice.style.display = "flex";
    document.querySelector("header").style.display = "flex";

    // 결과 박스 숨기기
    document.querySelector(".result").style.display = "none";
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

      progressText.innerText = `${choice.dataset.index} / 3`;
      progressImage.style.width = `${(choice.dataset.index / 3) * 100}%`;
      break;

    case 3:
      //내용변경
      choiceText.innerText = "취향을 선택하세요";
      choiceItems1.innerText = "조용한곳";

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
