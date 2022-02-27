var currentQuestionId = 0;
var time = questions.length * 15;
var timerId;

var questionsElement = document.getElementById("questions");
var timerElement = document.getElementById("time");
var choicesDivElement = document.getElementById("choice");
var startBtn = document.getElementById("start");
var scoreElement = document.getElementById("score");
var resultsDiv = document.querySelector(".results");
var initialsInput = document.querySelector(".initials");
var submitBtn = document.querySelector(".submit-btn");
var playBtn = document.querySelector(".play");
var highScoreList = document.querySelector(".playerScores");
var highScoresContainer = document.querySelector(".score-list");
var localStorageScores = JSON.parse(localStorage.getItem("scores")) || [];

console.log(localStorageScores);

submitBtn.addEventListener("click", function () {
  submitScoreToLocalStorage();
  viewHighScoresFromStorage();
  // whatever
});

playBtn.addEventListener("click", start);
startBtn.addEventListener("click", start);

function start() {
  highScoresContainer.setAttribute("class", "hide");
  currentQuestionId = 0;
  time = questions.length * 15;
  var startScreenElement = document.getElementById("start-screen");
  startScreenElement.setAttribute("class", "hide");

  questionsElement.removeAttribute("class");

  timerId = setInterval(clockTime, 1000);

  timerElement.textContent = time;
  displayQuestions();
}

function displayQuestions() {
  var questionCurrent = questions[currentQuestionId];
  var titleElement = document.getElementById("questions-title");

  titleElement.textContent = questions[currentQuestionId].title;
  choicesDivElement.innerHTML = "";
  console.log(titleElement);
  questionCurrent.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    // answerButton.onclick = evaluateQuestion;
    choiceBtn.addEventListener("click", evaluateQuestion);
    choicesDivElement.appendChild(choiceBtn);
  });
}

function evaluateQuestion() {
  if (this.value !== questions[currentQuestionId].answer && time >= 15) {
    time -= 15;
  }

  if (currentQuestionId === questions.length - 1) {
    clearInterval(timerId);
    displayResults();
  } else {
    currentQuestionId++;
    displayQuestions();
  }
}

function displayResults() {
  questionsElement.setAttribute("class", "hide");
  resultsDiv.removeAttribute("class", "hide");
  scoreElement.textContent = time;
}

function clockTime() {
  if (time === 1) {
    displayResults();
    clearInterval(timerId);
  }
  time--;
  timerElement.textContent = time;
}

function submitScoreToLocalStorage() {
  var initials = initialsInput.value;
  localStorageScores.push({ initials, score: time.toString() });
  localStorage.setItem("scores", JSON.stringify(localStorageScores));
  resultsDiv.setAttribute("class", "hide");
}

function viewHighScoresFromStorage() {
  highScoresContainer.removeAttribute("class", "hide");
  localStorageScores.forEach((score) => {
    var scoreListItem = document.createElement("li");
    scoreListItem.textContent = `Name: ${score.initials}, Score: ${score.score}`;
    highScoreList.appendChild(scoreListItem);
    // {name: RD, score: 23}
  });
}
