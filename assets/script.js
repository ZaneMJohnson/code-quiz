// Defining Variables
var quizTimerEl = document.querySelector("#timer");
var introEl = document.querySelector("#intro");
var quizBoxEl = document.querySelector("#quiz");
var finalScoreEl = document.querySelector("#finalscore");
var scoreEl = document.querySelector("#score");
var resultsEl = document.querySelector("#results");
var startButtonEl = document.querySelector("#startquiz");
var current = 0;
var timeLeft = 0;
var timeInterval = "";
var initials = document.querySelector("#initials");

scoresList = [];

// List Questions with answers, providing correct answer
var questions = [
    {
        question: "What is considered to be the most popular programming language in the world?",
        answers: ["Swift", "HTML", "JavaScript", "Ruby"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is the format called that is used for storing and transporting data?",
        answers: ["JSON", "HTML", "Font", "Syntax"],
        correctAnswer: "JSON"
    },
    {
        question: "What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
        answers: ["Scope", "Output", "JSON", "Syntax"],
        correctAnswer: "Syntax"
    },
    {
        question: "JavaScript is a ___-side programming language?",
        answers: ["Client", "Server", "Both", "None"],
        correctAnswer: "Both"
    },
    {
        question: "Which of the following will write the message 'Hello DataFlair!' in an alert box?",
        answers: ["alertBox('Hello DateFlair!');", "alert(Hello DataFlair!);", "semsgAlert('Hello DataFlair!');", "alert('Hello DataFlair!');"],
        correctAnswer: "alert('Hello DataFlair!');"
    }
]

// List Event Listeners when user clicks events on buttons
introEl.addEventListener("click", startQuiz)

quizBoxEl.addEventListener("click", answerQuestion)

finalScoreEl.addEventListener("click", submitScore)

// Start quiz function
function startQuiz (event){
    if (event.target.matches("#startquiz")) {
        introEl.style.display = "none";
        quizBoxEl.style.display = "flex";
        current = 0;
        countdown();
        displayQuestion();
    }
}

// Post/Print current question function
function displayQuestion () {
    quizBoxEl.innerHTML = (`
        <h1>${questions[current].question}</h1>
        <div id="answerbutton" class ="button" data-answer="${questions[current].answers[0]}">${questions[current].answers[0]}</div>
        <div id="answerbutton" class ="button" data-answer="${questions[current].answers[1]}">${questions[current].answers[1]}</div>
        <div id="answerbutton" class ="button" data-answer="${questions[current].answers[2]}">${questions[current].answers[2]}</div>
        <div id="answerbutton" class ="button" data-answer="${questions[current].answers[3]}">${questions[current].answers[3]}</div>
    `)
}

// This function gives actions when user clicks on question answers
function answerQuestion(event) {
    if (event.target.matches("#answerbutton")) {
        if (event.target.textContent === questions[current].correctAnswer) {
            resultsEl.style.display = "block";
            resultsEl.textContent = "Question #" + (current + 1) + " Correct!";
            resultsEl.style.color = "var(--right)";
            setTimeout(answerInterval, 1000);
        } else {
            timeLeft = (timeLeft - 10);
            resultsEl.style.display = "block";
            resultsEl.textContent = "Question #" + (current + 1) + " Wrong!";
            resultsEl.style.color = "var(--wrong)";
            setTimeout(answerInterval, 1000);
        }
        if (current < (questions.length - 1)) {
            current++;
            displayQuestion();
        } else {
            endQuiz();
        }
    }
} 

// Function to clear the temporarily displayed correct or wrong status reguarding question answers
function answerInterval() {
    resultsEl.textContent = "";
    resultsEl.style.display = "none";
}

// Fuction that starts countdown
function countdown() {
    timeLeft = 60;
    timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        quizTimerEl.textContent = timeLeft;
        timeLeft--;
      } else {
        endQuiz();
      }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    quizTimerEl.textContent = "";
    scoreEl.textContent = timeLeft;
    clearInterval(timeInterval);
    quizBoxEl.style.display = "none";
    finalScoreEl.style.display = "flex";
    document.getElementById("initials").focus();
}

// Function that submits scores with users identifier when quiz is submitted
function submitScore(event) {
    event.preventDefault();
    if (initials.value === "") {
        return;
      }
    var storedScores = JSON.parse(localStorage.getItem("scoresList"));
    if (storedScores !== null) {
        scoresList = storedScores;
      }
    if (event.target.matches("#submit")) {
        var highScore = {
        initials: initials.value,
        score: scoreEl.textContent
        };
        scoresList.push(highScore);
        console.log(highScore);
        console.log(scoresList);
        localStorage.setItem("scoresList", JSON.stringify(scoresList));
        window.location.href = "./highscores.html";
    }
  }