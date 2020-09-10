
//variable questions is declared here objects and arrays for questions
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?:",
        possibleAnswers: ["<javascript>", "<js>", "<script>", "<scripting>"],
        correctAnswer: "<script>"
    },
    {
        title: " Which of the following attribute can hold the JavaScript version?",
        possibleAnswers: ["Version", "Script", "Language", "None of the above"],
        correctAnswer: "Language"
    },
    {
        title: "Which of the following code creates an object?",
        possibleAnswers: ["var book = new OBJECT();", "var book = new Book();", "var book = Object();", "var book = new Object();"],
        correctAnswer: "var book = new Object();"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        possibleAnswers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        possibleAnswers: ["Javascript", "terminal / bash", "for loops", "console log"],
        correctAnswer: "console log"
    },
    {
        title: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?:",
        possibleAnswers: ["if i <> 5", "if (i <> 5)", "if i =! 5 then ", "if (i != 5) "],
        correctAnswer: "if (i != 5) "
    },
    {
        title: "How do you round the number 7.25, to the nearest integer?:",
        possibleAnswers: ["Math.rnd(7.25)", "rnd(7.25)", "round(7.25)", "Math.round(7.25)"],
        correctAnswer: "Math.round(7.25) "
    },
];

var score = 0;
var questionIndex = 0;

// working code starts here and some variables are declared here 
var quizContent = document.querySelector("#quizContent");
var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startingTime");

// time and seconds left for users 
var secondsLeft = 80;
var holdInterval = 0;
// 8 seconds penalty for every wrong answer. 
var penalty = 8;

var ulCreate = document.createElement("ul");



timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Your Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    quizContent.innerHTML = "";
    ulCreate.innerHTML = "";
    // question title is appended here
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].possibleAnswers;
    console.log(userQuestion)
    quizContent.textContent = userQuestion;
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizContent.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// created event to compare answers and choices 
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "makeDiv");
        // right condition 
        if (element.textContent == questions[questionIndex].correctAnswer) {
            score++;
            makeDiv.textContent = "You Got it! The right answer is:  " + questions[questionIndex].correctAnswer;
            // right condition 
        } else {

            secondsLeft = secondsLeft - penalty;
            makeDiv.textContent = "Opps! The right answer is:  " + questions[questionIndex].correctAnswer;
        }

    }
    // Question Index to determine what question number is the user currently on 
    questionIndex++;

    if (questionIndex >= questions.length) {

        allDone();
        makeDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    quizContent.appendChild(makeDiv);

}

function allDone() {
    quizContent.innerHTML = "";
    currentTime.innerHTML = "";


    var makeH1 = document.createElement("h1");
    makeH1.setAttribute("id", "makeH1");
    makeH1.textContent = " Quiz is Over!"

    quizContent.appendChild(makeH1);


    var makeP = document.createElement("p");
    makeP.setAttribute("id", "makeP");

    quizContent.appendChild(makeP);

    //time remaining is calculated here
    //replace the remaing time with score 
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var makeP2 = document.createElement("p");
        clearInterval(holdInterval);
        makeP.textContent = "Your final score is: " + timeRemaining;

        quizContent.appendChild(makeP2);
    }

    // created Label
    var makeLabel = document.createElement("label");
    makeLabel.setAttribute("id", "makeLabel");
    makeLabel.textContent = "Type initials here: ";

    quizContent.appendChild(makeLabel);

    //created input
    var makeInput = document.createElement("input");
    makeInput.setAttribute("type", "text");
    makeInput.setAttribute("id", "initials");
    makeInput.textContent = "";

    quizContent.appendChild(makeInput);

    // created submit
    var makeSubmit = document.createElement("button");
    makeSubmit.setAttribute("type", "submit");
    makeSubmit.setAttribute("id", "Submit");
    makeSubmit.textContent = "Submit";

    quizContent.appendChild(makeSubmit);

    // Event listenr here is for storing the initials and scored in local storage
    makeSubmit.addEventListener("click", function () {
        var initials = makeInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var everyScore = localStorage.getItem("everyScore");
            if (everyScore === null) {
                everyScore = [];
            } else {
                everyScore = JSON.parse(everyScore);
            }
            everyScore.push(finalScore);
            var newScore = JSON.stringify(everyScore);
            localStorage.setItem("everyScore", newScore);
            // takes you to the last page 
            window.location.replace("./highScores.html");
        }
    });

}