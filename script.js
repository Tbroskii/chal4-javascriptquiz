//Declaring globals
var studentAnswer;
var quiz = document.getElementById("quiz");
var time = document.getElementById("current-time");
var response = document.getElementById("show-response");
var secondsLeft = 75;
var index = 0;
var playerScore = 0;
var scoreList = [];
var playerInitials = "";

localStorage.setItem("allPlayerScore", localStorage.getItem("allPlayerScore") + ("playerScore"));

console.log(localStorage.getItem("playerScore"));

var questions = 
[
'<h1 id="question">Which of the following methods can be used to add an element to the end of an array?</h1><ul id="answers"><li><button onclick="correctAnswer()" > a) push()</button></li><li><button onclick="incorrectAnswer()" > b) unshift()</button></li><li><button onclick="incorrectAnswer()" > c) concat()</button></li><li><button onclick="incorrectAnswer()" > d) pop()</button></li></ul>',
'<h1 id="question">How can you convert a string to an integer in JavaScript?</h1><ul id="answers"><li><button onclick="incorrectAnswer()" > a) toString()</button></li><li><button onclick="incorrectAnswer()" > b) parseFloat()</button></li><li><button onclick="correctAnswer()" > c) parseInt()</button></li><li><button onclick="incorrectAnswer()" > d) toFixed()</button></li></ul>',
'<h1 id="question">Which of the following is not a valid way to declare a variable in JavaScript?</h1><ul id="answers"><li><button onclick="incorrectAnswer()" > a) let</button></li><li><button onclick="incorrectAnswer()" > b) const</button></li><li><button onclick="incorrectAnswer()" > c) var</button></li><li><button onclick="correctAnswer()" > d) variable</button></li></ul>',
'<h1 id="question">What does the typeof operator return for an array?</h1><ul id="answers"><li><button onclick="incorrectAnswer()" > a)  "array"</button></li><li><button onclick="correctAnswer()" > b) "object"</button></li><li><button onclick="incorrectAnswer()" > c) "array-like"</button></li><li><button onclick="incorrectAnswer()" > d) "undefined"</button></li></ul>',
'<h1 id="question">Which of the following is not a primitive data type in JavaScript?</h1><ul id="answers"><li><button onclick="incorrectAnswer()" > a) boolean</button></li><li><button onclick="incorrectAnswer()" > b) string</button></li><li><button onclick="correctAnswer()" > c) array</button></li><li><button onclick="incorrectAnswer()" > d) number</button></li></ul>'
]

//setting a timer
if (document.URL.includes("quiz.html")){
function setTime () {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft;

        if (secondsLeft <= 0)
        {
            clearInterval(timerInterval);
            endQuiz();
        }
        if (index === questions.length)
        {
            clearInterval(timerInterval);
            index = 0;
        }

    }, 1000)
}
//starting timer
setTime();
}



function correctAnswer (){
    index++;

    quiz.innerHTML = "";
    quiz.innerHTML += questions[index];
    
    response.innerHTML = "";
    response.innerHTML = '<h2>Correct</h2>';

    if (index === questions.length)
    {
        endQuiz();
    }
}
function incorrectAnswer () {
    index++;

    quiz.innerHTML = "";
    quiz.innerHTML += questions[index];

    response.innerHTML = "";
    response.innerHTML = '<h2>Incorrect</h2>';

    secondsLeft -= 10;
    if (index === questions.length)
    {
        endQuiz();
    }
}

function endQuiz() {

    playerScore = secondsLeft;
    quiz.innerHTML = "";
    quiz.innerHTML = '<h1 id="question">All done!</h1><p id="score">Your final score is </p><form id="playerScoreForm" action="highscore.html"><span id="score"> Enter intials: </span><input type="text" name="" id="playerScore"><button id="submitScore">Submit</button></form>';
    var playerScoreTxt = document.getElementById("score");
    playerScoreTxt.textContent += playerScore + ".";
    var txtBx = document.getElementById("playerScore");
    var submitInitials = document.getElementById("submitScore");
    submitInitials.onclick = function(){
        localStorage.setItem("playerScore", txtBx.value + " - " + playerScore.toString() + ",");
    }
    
}

