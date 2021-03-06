const QUESTION_COUNT = Question.length; // 질문갯수;

let CURRENT_INDEX = 0; // 현재 질문의 인덱스, 초기값 : 0
let CURRENT_QUESTION; // 현재 질문 객체

let RESULT_BOX = []; // 답변을 모아두는 박스

const QUESTION_PAGE = document.querySelector(".question_container"); // 질문페이지
const RESULT_PAGE = document.querySelector(".result"); //결과페이지
const RESULT_MAP_PAGE = document.querySelector(".result_map_container"); //결과 맵

/* 첫페이지 */
// 버튼 누르면 첫화면 사라지고 질문페이지 생성
document.querySelector(".first_page button").addEventListener("click", () => {
  document.querySelector(".first_page").style.display = "none";
  makeQuestion(CURRENT_INDEX);
});

/* 질문페이지 */
/**
 * 현재 인덱스의 질문, 내용, 진행도, 뒤로가기 버튼을 보여주는 함수
 *
 * @param {number} idx 현재 질문의 인덱스
 */
function makeQuestion(idx) {
  QUESTION_PAGE.style.display = "flex";

  CURRENT_QUESTION = Question[CURRENT_INDEX]; // 현재 질문 객체

  let curImg = CURRENT_QUESTION.img;
  let curTitle = CURRENT_QUESTION.question;
  let curAnswer1 = CURRENT_QUESTION.answer[0].text;
  let curAnswer2 = CURRENT_QUESTION.answer[1].text;

  let choiceImg = document.querySelector(".question_img");
  let choiceText = document.querySelector(".question_head > h1"); // 질문제목
  let choiceItems1 = document.querySelector(
    ".question_text_box > .question_text:nth-child(1)" // 답변내용1
  );
  let choiceItems2 = document.querySelector(
    ".question_text_box > .question_text:nth-child(2)" // 답변내용2
  );

  choiceImg.src = curImg;
  choiceText.innerHTML = curTitle;
  choiceItems1.innerHTML = curAnswer1;
  choiceItems2.innerHTML = curAnswer2;

  choiceItems1.addEventListener("click", nextQuestion);
  choiceItems2.addEventListener("click", nextQuestion);

  progressBar(idx);
  makeBackBtn();
}

/**
 * 질문 내용 선택시 질문값을 저장하고 다음 질문을 보여주는 함수
 *
 * @param {string} event
 * @returns {function} makeQuestion |  resultAnimation 다음 인덱스의 질문을 만들거나 결과애니메이션을 반환
 */
function nextQuestion(event) {
  CURRENT_INDEX++;

  // 질문값 저장
  let curValue1 = CURRENT_QUESTION.answer[0].value[0];
  let curValue2 = CURRENT_QUESTION.answer[1].value[0];

  event.target.textContent.slice(0, 3) ===
  CURRENT_QUESTION.answer[0].text.slice(0, 3)
    ? RESULT_BOX.push(curValue1)
    : RESULT_BOX.push(curValue2);

  if (CURRENT_INDEX < QUESTION_COUNT) {
    return makeQuestion(CURRENT_INDEX);
  } else {
    // 현재 인덱스가 질문 수와 같아지면 결과페이지 출력
    CURRENT_INDEX = 0; // 질문이 끝났으므로 인덱스를 초기화
    return resultAnimation();
  }
}

/**
 * 뒤로가기 버튼을 누르면 실행되는 함수, 이전 질문을 보여주고, 질문결과의 마지막 값을 제거한다.
 */
function backwardBtn() {
  CURRENT_INDEX--;

  makeQuestion(CURRENT_INDEX);

  RESULT_BOX.pop();
}

/**
 * 질문 진행에 따라 진행도를 보여주는 함수
 *
 * @param {number} idx 현재 질문의 인덱스
 */
function progressBar(idx) {
  let progressText = document.querySelector("header .progress .progress-text"); // 진행바텍스트
  let progressImage = document.querySelector(
    "header .progress .progress-bar .progress-image" // 진행바
  );
  progressImage.style.width = `${(idx / (QUESTION_COUNT - 1)) * 100}%`; // 진행바
  progressText.innerHTML = `${idx + 1} / ${QUESTION_COUNT}`; // 진행도
}

/**
 * 뒤로가기 버튼 생성함수
 */
function makeBackBtn() {
  let backBtn = document.querySelector(".question_back_btn"); // 뒤로가기 버튼
  backBtn.addEventListener("click", backwardBtn);

  CURRENT_INDEX < QUESTION_COUNT && CURRENT_INDEX > 0
    ? (backBtn.style.visibility = " visible")
    : (backBtn.style.visibility = " hidden");
}

/** 결과페이지
 *
 * 난이도 : "beginner - b" , "intermediate - i"
 * 한강, 내륙 : "Hangang" - H , "inland" - i
 * 혼잡도 : "loud" - l, "quiet"- q
 */

/**
 * 질문에 따른 결과인덱스를 반환하는 함수
 *
 * @returns {number} 결과데이터 인덱스
 */

const resultValue = () => {
  switch (RESULT_BOX.join("")) {
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

/**
 * 결과를 출력하는 함수
 */
const makeResult = () => {
  RESULT_PAGE.style.display = "flex";

  const resultIdx = resultValue();
  const course = CourseData[resultIdx];

  const courseDistance = course.courseDistance;
  const courseName = course.courseName;
  const courseInfo = course.courseInfo;
  const courseDestination = course.courseDestination;
  const coursePath = course.coursePath;
  const courseId = course.id;

  // 지도
  RESULT_MAP_PAGE.innerHTML = `<div id="map" class="map_style"></div>`;
  showCourse(resultIdx); // map.js에 있는 코스보여주는 함수

  // 결과
  // 코스 제목
  const resultHead = document.querySelector(".result_head");
  let resultHeadContent = `<span class="courseNameNum">${
    courseId + 1
  }코스</span>`;
  resultHeadContent += `<span class="courseName">${courseName}</span>`;
  resultHead.innerHTML = resultHeadContent;

  // 코스 목적지
  const resultCourseDestination = document.querySelector(
    ".result_course_destination span:nth-child(1)"
  );
  resultCourseDestination.textContent = courseDestination;

  // 코스 대략적 거리
  const resultCourseDistance = document.querySelector(
    ".result_course_destination span:nth-child(2)"
  );
  resultCourseDistance.textContent = courseDistance;

  // 코스 경로
  const resultCoursePath = document.querySelector(".result_course_path");
  resultCoursePath.innerHTML = `${coursePath}`;

  // 코스 상세
  let resultText = courseInfo;
  document.querySelector(".result_text").innerHTML += resultText;

  // 다시하기, 공유하기 버튼
  let choiceBtn = document.querySelector(".result_btn_container");
  choiceBtn.style.display = "block";

  document
    .querySelector(".result_btn_container button:nth-child(1)")
    .addEventListener("click", reStartBtn);

  document
    .querySelector(".result_btn_container button:nth-child(2)")
    .addEventListener("click", modalBtn);
};

/**
 * 다시하기 함수
 */
const reStartBtn = () => {
  QUESTION_PAGE.style.display = "block"; //질문,답변 전체 div
  RESULT_PAGE.style.display = "none";
  RESULT_BOX = [];
  makeQuestion(0);
};

/**
 * 애니메이션 페이지 2초 후 없애버리는 함수
 * 애니메이션 페이지를 불러오고 결과페이지를 불러온다.
 * 로딩을 최대 2초 기다리고 애니메이션 페이지를 제거하여 결과페이지를 보여준다.
 */
function resultAnimation() {
  QUESTION_PAGE.style.display = "none"; //질문,답변 전체 div
  document.querySelector(".result_animation").style.display = "block"; // animation page

  setTimeout(() => {
    document.querySelector(".result_animation").style.display = "none";
    makeResult();
  }, 2000);
}

/**
 * 공유하기 모달 창 만드는 함수
 */
function modalBtn() {
  const modal = document.querySelector(".result_modal");
  const exitBtn = document.querySelector(".modal_exit");

  document
    .querySelectorAll(".modal_content:nth-child(2)")
    .forEach((elm) => elm.addEventListener("click", clip));

  document
    .querySelectorAll(".modal_content:nth-child(3)")
    .forEach((elm) => elm.addEventListener("click", kakaoSendLink));

  modal.style.display = "block";

  exitBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

/**
 * 공유하기 - 현재 링크 복사
 */
function clip() {
  let url = "";
  const textarea = document.createElement("textarea");

  document.body.appendChild(textarea);
  url = window.document.location.href;
  textarea.value = url;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  alert("복사되었습니다 !");
}

/**
 * 공유하기 - 카카오톡
 */
function kakaoSendLink() {
  if (!Kakao.isInitialized()) Kakao.init("16c159fd8e6cf9b9dc0f34f5922c2f5a");

  Kakao.Link.sendDefault({
    objectType: "text",
    text: "망원러닝메이트!!",
    link: {
      mobileWebUrl: "https://developers.kakao.com",
      webUrl: "https://developers.kakao.com",
    },
  });
}
