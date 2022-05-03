/* 첫페이지 */
// 버튼 누르면 첫화면 사라지고 질문페이지 생성
document.querySelector(".first__page button").addEventListener("click", () => {
  document.querySelector(".first__page").style.display = "none";
  makeQuestion(currentIndex);
});

/* 질문페이지 */
const questionCount = Question.length; // 질문갯수;

let currentIndex = 0; // 현재 질문의 인덱스, 초기값 : 0
let currentQuestion; // 현재 질문 객체

let resultBox = []; // 답변을 모아두는 박스

// 현재 인덱스의 질문, 내용, 진행도, 다시하기버튼을 보여주는 함수
function makeQuestion(idx) {
  document.querySelector(".container").style.display = "flex";

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
  makeBackBtn();
}

// 질문 내용 선택시 질문값을 저장하고 다음 질문을 보여주는 함수
function nextQuestion(event) {
  currentIndex++;

  // 질문값 저장
  let curValue1 = currentQuestion.answer[0].value[0];
  let curValue2 = currentQuestion.answer[1].value[0];

  event.target.innerText === currentQuestion.answer[0].text
    ? resultBox.push(curValue1)
    : resultBox.push(curValue2);

  if (currentIndex < questionCount) {
    return makeQuestion(currentIndex);
  } else {
    // 현재 인덱스가 질문 수와 같아지면 결과페이지 출력
    currentIndex = 0; // 질문이 끝났으므로 인덱스를 초기화
    return resultAnimation();
  }
}

// 뒤로가기 버튼을 누르면 실행되는 함수, 이전 질문을 보여주고, 질문결과의 마지막 값을 제거한다.
function backwardBtn() {
  currentIndex--;

  makeQuestion(currentIndex);

  resultBox.pop();
}

// 질문 진행에 따라 진행도를 보여주는 함수
function progressBar(idx) {
  let progressText = document.querySelector("header .progress .progress-text"); // 진행바텍스트
  let progressImage = document.querySelector(
    "header .progress .progress-bar .progress-image" // 진행바
  );
  progressImage.style.width = `${((idx + 1) / questionCount) * 100}%`; // 진행바
  progressText.innerHTML = `${idx + 1} / ${questionCount}`; // 진행도
}

// 뒤로가기 버튼 생성함수
function makeBackBtn() {
  let backBtn = document.querySelector(".back_btn"); // 뒤로가기 버튼

  currentIndex < questionCount && currentIndex > 0
    ? (backBtn.style.visibility = " visible")
    : (backBtn.style.visibility = " hidden");
}

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

const container = document.querySelector(".container"); //질문,답변 전체 div
const choiceResult = document.querySelector(".result_map_container"); //결과
const resultPage = document.querySelector(".result"); //결과
// const resultPage = document.querySelector(".result_container"); // 결과 div

// 결과를 출력하는 함수
const makeResult = () => {
  container.style.display = "none";

  resultPage.style.display = "flex";

  const resultIdx = resultValue();
  const course = CourseData[resultIdx];
  // const courseDistance = course.courseDistance;
  const courseName = course.courseName;
  const courseInfo = course.courseInfo;
  const coursePath = course.coursePath;

  // 지도
  showCourse(resultIdx); // map.js에 있는 코스보여주는 함수

  // 결과
  const resultHead = document.querySelector(".result_head");
  resultHead.innerText = courseName;

  let resultText = `<h3>${coursePath}</h3>`;

  // resultText += `<h4>거리 : ${courseDistance}</h4>`;
  resultText += `<p>&nbsp;${courseInfo}</p>`;

  document.querySelector(".result_text").innerHTML += resultText;

  let choiceBtn = document.querySelector(".result_btn_container"); // 다시하기버튼
  choiceBtn.style.display = "block";
};

// 다시하기 함수
const reStartBtn = () => {
  container.style.display = "block";
  resultPage.style.display = "none";
  resultBox = [];
  makeQuestion(0);
};

// 애니메이션 페이지 2초 후 없애버리기
function resultAnimation() {
  document.querySelector(".result_animation").style.display = "block";
  setTimeout(() => {
    document.querySelector(".result_animation").style.display = "none";
    makeResult();
  }, 1500);
}
