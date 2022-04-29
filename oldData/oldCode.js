//////////////////////////////////// 예전 코드 /////////////////////////////////////////

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

let choiceBtn = document.querySelector(".choice-btn"); // 다시하기버튼

let progressText = document.querySelector("header .progress .progress-text"); // 진행바텍스트
let progressImage = document.querySelector(
  "header .progress .progress-bar .progress-image" // 진행바
);

const choice = document.querySelector("main .container .choice"); //질문,답변 전체 div

choice.dataset.index = 1; // choice div의 클래스 data-index 초기값

progressImage.style.width = `${
  ((choice.dataset.index * 1) / questionCount) * 100
}%`; // 진행바

choice-items를 클릭하면 choice-text와 choice-items가 바뀐다.
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
