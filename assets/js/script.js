const SERVER = "https://quiz-api-100devs.herokuapp.com";

const timer = document.querySelector(".timer");
const displayScore = document.querySelector(".points");
const wrongAnswer = document.querySelector(".wrong-answer");
const nextButton = document.querySelector(".next");
const moreInfoButton = document.querySelector(".info");
const moreInfoCard = document.querySelector(".more");
const moreInfoParagraph = document.querySelector(".more p");

const rightAnswer = document.querySelector(".right-answer");
const quizOptions = document.querySelector(".quiz-options");
const quizQuestion = document.querySelector(".quiz-question");
const answers = document.querySelectorAll(".answer");
const finalScoreSheet = document.querySelector(".end");
const finalScore = document.querySelector(".final-score");
const questionContainer = document.querySelector(".questions");
const submitScore = document.querySelector("#submit");
const name = document.querySelector("#name");
const nameAlertBox = document.querySelector(".name-alert");
const TwitterName = document.querySelector("#twitterName");
const totalTime = document.querySelector("#totalTime");


let time = 50;
let points = 0;
let currentIndex = 0;
let ifCorrectAnswer = false;
let questions = [];
let counter;

function init() {
  counter = setInterval(countdown, 1000);
  function countdown() {
    displayScore.innerHTML = `Score:${points}`;
    if (time <= 0) {
      timer.innerHTML = "Time:0";
      end(true, 0);
    } else {
      timer.innerHTML = `Time:${time}`;
    }
    time -= 1;
  }
}

async function quiz() {
  const res = await fetch(`${SERVER}/api/js`);
  const data = await res.json();
  quizQuestion.setAttribute("data-answer", JSON.stringify(data));
  setQuestions();
}

function setQuestions() {
  questions = JSON.parse(quizQuestion.getAttribute("data-answer"));

  if (currentIndex < questions.length) {
    rightAnswer.classList.add("hide");
    wrongAnswer.classList.add("hide");
    quizQuestion.innerHTML = questions[currentIndex].question;

    questions[currentIndex].choices.forEach((choice, j) => {
      let currentChoiceElement = document.querySelector(`.answer-options${j}`);
      console.log(currentChoiceElement.classList.contains('hide'))
     currentChoiceElement.classList.remove("hide")
      currentChoiceElement.innerHTML = choice;
    });
    ifCorrectAnswer = false;
  } else end(false, time);
}

quizOptions.addEventListener("click", function (e) {
  moreInfoCard.classList.add('hide')
  if (e.target.classList.contains("answer")) {
    if (
      e.target.getAttribute("data-index") ==
      questions[currentIndex].answer_index
    ) {
      points += 5;
      wrongAnswer.classList.add("hide");
      rightAnswer.classList.remove("hide");
      ifCorrectAnswer = true;
    }
    if (!ifCorrectAnswer) {
      wrongAnswer.classList.remove("hide");
      time -= 10;
    }
  }
});

nextButton.addEventListener("click", function (e) {
  questions[currentIndex].choices.forEach((choice, j) => {
    let currentChoiceElement = document.querySelector(`.answer-options${j}`);
   currentChoiceElement.classList.add("hide")
    currentChoiceElement.innerHTML = "";
  });
  currentIndex += 1;
  
  moreInfoCard.classList.add('hide')
  setQuestions();
});

moreInfoButton.addEventListener("click", function (e) {
  moreInfoParagraph.innerText = questions[currentIndex].info
  moreInfoCard.classList.toggle('hide')
  time-=5;
});

function end(ifTimeIsUp, remainingSeconds) {
  clearInterval(counter);
  totalTime.value = 150 - remainingSeconds;
  console.log(remainingSeconds, ifTimeIsUp);
  finalScoreSheet.classList.remove("hide");
  moreInfoCard.classList.add("hide");
  questionContainer.classList.add("hide");
  rightAnswer.classList.add("hide");
  wrongAnswer.classList.add("hide");
  finalScore.innerHTML = `${
    ifTimeIsUp
      ? "Time Is Up!!!"
      : "You still have " + remainingSeconds + " seconds!!!"
  } Your final score is ${points}`;
}

submitScore.addEventListener("click", function () {
  if (!name.value || !name.value.match(/[A-Za-z]/g)) {
    nameAlertBox.classList.remove("hide");
    nameAlertBox.innerHTML = "Please Add A Valid Name";
    return;
  }
  else {
    nameAlertBox.classList.add("hide");
    const person = {
      name :name.value,
      score: points,
      time: +totalTime.value
    };
    console.log(person)

    fetch(`${SERVER}/api/scores/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person)
    }).then((res) => {
      if (res) return res.json();
    })
    .then((response) => {
      console.log(response)
      window.location.href = " highscores.html"
    });
  }
});

init();
quiz();
