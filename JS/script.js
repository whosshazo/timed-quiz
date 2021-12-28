var currentQuestionId = 0;
var time = questions.length * 15;
var timerId;

var questionsElement = document.getElementById("questions");
var timerElement = document.getElementById("time");
var choiceElement = document.getElementById("choice");
var startBtn = document.getElementById("start");

function start() {
    var startScreenElement = document.getElementById("start-screen")
    startScreenElement.setAttribute("class", "hide")
    
    questionsElement.removeAttribute("class")

    timerId = setInterval(clockTime, 1000)
    
    timerElement.textContent = time
    displayQuestions();
};

function displayQuestions() {
    var questionCurrent = questions[currentQuestionId];
    var titleElement = document.getElementById("questions-title");

    titleElement.textContent = questions[currentQuestionId].title;
    choiceElement.innerHTML = "";
    console.log(titleElement)
    questionCurrent.choice.forEach(function(choices, i){
        var choicesElement = document.createElement("button");
        choicesElement.setAttribute("class", "choice");
        choicesElement.setAttribute("value", choices );
        choicesElement.textContent = i + 1 + ". " + choices;
        choicesElement.onclick = evaluateQuestion;
        choiceElement.appendChild(choicesElement);
    });
};

function evaluateQuestion(){
    // if (this.value != questions[currentQuestionId].answer) {
    //     time -= 15;

    //     if (time < 0) {
    //         time = 0
    //     }; 
    //     timerElement.textContent = time;
    // };
    currentQuestionId++
    if (currentQuestionId = questions.length) {
        displayQuestions()
    }
};

function clockTime() {
    time--
    timerElement.textContent = time
};

startBtn.onclick = start;


