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
progressImage.style.width = `${(1 / 3) * 100}%`;

// choice-items를 클릭하면 choice-text와 choice-items가 바뀐다.
// for (let i = 0; i < choiceItems.length; i++) {
//   choiceItems[i].addEventListener("click", () => {
//     if (choiceText.innerText === "난이도를 선택하세요") {
//       backBtn.style.display = "block";

//       progressText.innerText = "2 / 3";
//       progressImage.style.width = `${(2 / 3) * 100}%`;

//       resultBox.push(choiceItems[i].innerText);

//       choiceText.innerText = "계절을 선택하세요";
//       choiceItems1.innerText = "봄";
//       choiceItems2.innerText = "여름";
//       choiceItems3.innerText = "가을";
//     } else if (choiceText.innerText === "계절을 선택하세요") {
//       progressText.innerText = "3 / 3";
//       progressImage.style.width = `${(3 / 3) * 100}%`;

//       resultBox.push(choiceItems[i].innerText);

//       choiceText.innerText = "취향을 선택하세요";
//       choiceItems1.innerText = "조용한곳";
//       choiceItems2.innerText = "사람많은곳";
//       choiceItems3.innerText = "적당한곳";
//     } else if (choiceText.innerText === "취향을 선택하세요") {
//       backBtn.style.display = "none";

//       resultBox.push(choiceItems[i].innerText);
//       // 결과 페이지
//       choiceText.innerText = "당신의 결과는??";
//       choiceBox.style.display = "none";
//       choiceResult.style.display = "block";
//       choiceResult.innerHTML = `<div style="width:40vw;height:50vh;background-color:blue;font-size:40px">
//                      <h1 style="color:yellow;text-align:center">결과는 ${resultBox[0]} - ${resultBox[1]} - ${resultBox[2]} ${resultBox}kakaomap<h1>
//                          </div>`;
//       choiceBtn.style.display = "block";
//     }
//   });
// }
console.log(resultBox);

// 다시하기를 누르면 일어나는 일
document
  .querySelector(".choice-btn > button:nth-child(1)")
  .addEventListener("click", () => {
    choiceText.innerText = "난이도를 선택하세요";
    choiceItems1.innerText = "하";
    choiceItems2.innerText = "중";
    choiceItems3.innerText = "상";
    choiceBox.style.display = "flex";
    choiceResult.style.display = "none";
    // 결과박스 초기화
    resultBox = [];
    choiceBtn.style.display = "none";
    // 진행박스 초기화
    progressText.innerText = "1 / 3";
    progressImage.style.width = `${(1 / 3) * 100}%`;
  });

// 뒤로가기를 누르면 일어나는 일
backBtn.addEventListener("click", () => {
  //순번을 뒤로 미룬다.
});
/* 추가로 해야할것? 
        1. display:flex를 너무 많이씀 
        2. display: none을 너무 많이씀 에초에 안보이게 하지말고 결과창에서 생겨나게 하는것도 방법
        3. 디자인
        4. 스토리, 기획, 사진, 선택지 등 아이디어
        5. 결과박스를 리스트로 할 것인지, 결과를 뽑아내는 로직을 어떻게 할지 생각
        */

const choice = document.querySelector("main .container .choice");
choice.dataset.index = 1;

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

        //진행도 체크
        progressText.innerText = "2 / 3";
        progressImage.style.width = `${(2 / 3) * 100}%`;

        //결과에 클릭한 값을 입력
        resultBox.push(choiceItems[i].innerText);

        //다음 문제로 넘어가기
        choice.dataset.index = choice.dataset.index * 1 + 1;
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
        break;

      case 3:
        resultBox.push(choiceItems[i].innerText);

        //뒤로가기버튼 삭제
        backBtn.style.display = "none";

        //결과출력
        choiceText.innerText = "당신의 결과는??";
        choiceBox.style.display = "none";
        choiceResult.style.display = "block";
        choiceResult.innerHTML = `<div style="width:40vw;height:50vh;background-color:blue;font-size:40px">
                     <h1 style="color:yellow;text-align:center">결과는 ${resultBox[0]} - ${resultBox[1]} - ${resultBox[2]} ${resultBox}kakaomap<h1>
                         </div>`;

        break;
    }
  });
}
