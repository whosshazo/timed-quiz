var currentQuestionId = 0;
var time = question.lenght * 15;
var timerId;

var questionsElement = document.getElementById("questions")
var timerElement = document.getElementById("time")
var choiceElement = document.getElementById("choice")
var startBtn = document.getElementById("start")

function start() {
    var startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");
    
    questionsElement.removeAttribute("class")

    timerId = setInterval(clockTime, 1000)
    timerElement.textContent = time
    displayQuestions();
};

function displayQuestions() {
    var questionCurrent = questions[currentQuestionId]
    var titleElement = document.getElementById("questions-title")

    titleElement.textContent = questionCurrent.title;
    choiceElement.innerHTML = ""
    questionCurrent.choice.forEach(function(choices, i){
        var choicesElement = document.createElement("button")
        choicesElement.setAttribute("class", "choice")
        choicesElement.setAttribute("value", choices )
    });
}


// WHEN START BUTTON AT CENTER OF PAGE IS CLICKED, I AM PRESENTED WITH THE FIRST QUESTION AND A TIMER WILL START IN THE TOP RIGHT CORNER
button = "start";

button.addEventListener("click", start)

//IF I ANSWER THE QUESTION, I AM PRESENTED WITH ANOTHER QUESTION IN ITS PLACE. THE PAGE SHOULD DISPLAY WHETHER THE ANSWER WAS CORRECT OR NOT


//IF I ANSWER THE QUESTION WRONG I WILL LOSE 10secs OFF MY TIMER


//WHEN QUIZ IS COMPLETE OR TIMER = 0, I AM ABLE TO VIEW AND SAVE MY SCORE.