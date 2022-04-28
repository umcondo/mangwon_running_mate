/* 첫페이지 */
document.querySelector(".first__page button").addEventListener("click", () => {
  document.querySelector(".first__page").style.display = "none";
});

/* 질문페이지 */
const questionCount = Question.length; // 질문갯수;

let currentIndex = 0; // 현재 질문의 인덱스, 초기값 : 0
let currentQuestion; // 현재 질문 객체

let resultBox = []; // 답변을 모아두는 박스

// 현재 인덱스의 질문, 내용을 보여주는 함수
const makeQuestion = (idx) => {
  currentQuestion = Question[currentIndex]; // 현재 질문 객체

  let curTitle = currentQuestion.question;
  let curAnswer1 = currentQuestion.answer[0].text;
  let curAnswer2 = currentQuestion.answer[1].text;

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

  progressBar(idx);
};

// 질문 내용 선택시 질문값을 저장하고 다음 질문을 보여주는 함수
const nextQuestion = (event) => {
  currentIndex++;

  // 질문값 저장
  let curValue1 = currentQuestion.answer[0].value[0];
  let curValue2 = currentQuestion.answer[1].value[0];

  event.target.innerText === currentQuestion.answer[0].text
    ? resultBox.push(curValue1)
    : resultBox.push(curValue2);

  if (currentIndex < questionCount) {
    makeQuestion(currentIndex);
  } else {
    // 현재 인덱스가 질문 수와 같아지면 결과페이지 출력
    currentIndex = 0; // 질문이 끝났으므로 인덱스를 초기화
    makeResult();
    return;
    // 결과페이지
  }

  makeBackBtn();
  progressBar(currentIndex);
};

// 뒤로가기 버튼을 누르면 실행되는 함수, 이전 질문을 보여주고, 질문결과의 마지막 값을 제거한다.
const backwardBtn = () => {
  currentIndex--;
  makeQuestion(currentIndex);

  resultBox.pop();
  // console.log(resultBox);
  makeBackBtn();
  progressBar(currentIndex);
};

// 질문 진행에 따라 진행도를 보여주는 함수
const progressBar = (idx) => {
  let progressText = document.querySelector("header .progress .progress-text"); // 진행바텍스트
  let progressImage = document.querySelector(
    "header .progress .progress-bar .progress-image" // 진행바
  );
  progressImage.style.width = `${((idx + 1) / questionCount) * 100}%`; // 진행바
  progressText.innerHTML = `${idx + 1} / ${questionCount}`; // 진행도
};

// 뒤로가기 버튼 생성함수
const makeBackBtn = () => {
  let backBtn = document.querySelector(".back_btn"); // 뒤로가기 버튼

  // 뒤로가기 버튼 생성
  currentIndex < questionCount && currentIndex > 0
    ? (backBtn.style.display = "block")
    : (backBtn.style.display = "none");
};

makeQuestion(currentIndex);

/* 결과페이지 */
// "beginner" , "intermediate", "Hangang", "inland", "loud", "quiet"

// 결과값 함수
const resultValue = () => {
  switch (resultBox.join("")) {
    case "bHl": // 선유도
      return 0;
    case "bHq": // 홍제천
      return 1;
    case "bil": // 경의선
      return 2;
    case "biq": // 당인리
      return 3;
    case "iHl": //마포대교
      return 4;
    case "iHq": // 가양대교
      return 5;
    case "iil": // 마포 한바퀴
      return 6;
    case "iiq": // 난지
      return 7;
    default:
      break;
  }
};

const choice = document.querySelector("main .container .choice"); //질문,답변 전체 div
const choiceResult = document.querySelector(".choice-result"); //결과
const progressBarBox = document.querySelector("header"); // 진행바
const resultPage = document.querySelector(".result"); // 결과 div

// 결과를 출력하는 함수
const makeResult = () => {
  choice.style.display = "none";
  progressBarBox.style.display = "none";
  resultPage.style.display = "flex";

  const resultIdx = resultValue();
  const course = CourseData[resultIdx];
  const courseDistance = course.courseDistance;
  const courseName = course.courseName;
  const courseInfo = course.courseInfo;

  // 지도
  choiceResult.innerHTML = `<div id="map" style="width:1000px;height:500px;"></div>`;
  // map();
  showCourse(resultIdx);
  let newDiv = document.createElement("div");
  choiceResult.append(newDiv);

  // 결과
  let resultText = `<div class="result_text">`;
  resultText = `<h1>코스 : ${courseName} </h1>`;
  resultText += `<h3>코스번호 : ${resultIdx}</h3>`;
  resultText += `<h4>코스길이 : ${courseDistance}</h4>`;
  resultText += `<p>코스정보 : ${courseInfo}</p>`;
  resultText += `</div>`;

  document.querySelector(".result_text").innerHTML = resultText;

  let choiceBtn = document.querySelector(".choice-btn"); // 다시하기버튼
  choiceBtn.style.display = "block";
};
// 지도를 출력하는 함수

// 다시하기 함수
const reStartBtn = () => {
  choice.style.display = "flex";
  progressBarBox.style.display = "flex";
  resultPage.style.display = "none";
  resultBox = [];
  makeQuestion(0);
};

/*    지도    */

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
