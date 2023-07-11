//Declaring globals
var studentAnswer;
var quiz = document.getElementById("quiz");
var time = document.getElementById("current-time");
var response = document.getElementById("show-response");
var clearScores = document.getElementById("clear-scores");
var highScoreDisplay = document.getElementById("show-highscores");
var secondsLeft = 75;
var index = 0;
var playerScore = 0;
var playerInitials = "";

//Setting an array of questions to be iterated through
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
//Displaying highscores on view high scores page
highScoreDisplay.innerHTML = localStorage.getItem("allPlayerScores");

//handling when correct answer is clicked
function correctAnswer (){
    //iterate through the array
    index++;

    //clear old question and insert new one
    quiz.innerHTML = "";
    quiz.innerHTML += questions[index];
    
    //show if last question answered was correct of incorrect
    response.innerHTML = "";
    response.innerHTML = '<h2>Correct</h2>';

    //seeing when all questions have been asked
    if (index === questions.length)
    {
        endQuiz();
    }
}

//handling when incorrect answer is clicked
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
    // getting player score
    playerScore = secondsLeft;
    //clearing quiz after it has been completing
    quiz.innerHTML = "";
    //inserting intial entry html
    quiz.innerHTML = '<h1 id="question">All done!</h1><p id="score">Your final score is </p><form id="playerScoreForm" action="highscore.html"><span id="score"> Enter intials: </span><input type="text" name="" id="playerScore"><button id="submitScore">Submit</button></form>';
    var playerScoreTxt = document.getElementById("score");
    playerScoreTxt.textContent += playerScore + ".";
    var txtBx = document.getElementById("playerScore");
    var submitInitials = document.getElementById("submitScore");

    submitInitials.onclick = function(){
        //making sure textbox has an entry if not will auto fill with UNKNOWn
        if (!(txtBx.value === ""))
        {
            localStorage.setItem("playerScore","<li>" + txtBx.value + " - " + playerScore.toString() + "</li>");
        }
        else
        {
            localStorage.setItem("playerScore","<li>" + "Unknown" + " - " + playerScore.toString() + "</li>");
        }

        //adding created li to list that will be displayed
        if (localStorage.getItem("allPlayerScores") === null)
        {
            localStorage.setItem("allPlayerScores", localStorage.getItem("playerScore"));
        }
        else
        {
            localStorage.setItem("allPlayerScores", localStorage.getItem("allPlayerScores") +  localStorage.getItem("playerScore"));
        }
    }
}


clearScores.onclick = function() {
    //clearing local storage
    localStorage.clear();
    //clearing all displayed 
    highScoreDisplay.innerHTML = "";
}

