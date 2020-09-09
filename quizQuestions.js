
// Var with array and object for questions 
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?:",
        possibleAnswers: ["<javascript>", "<js>", "<script>", "<scripting>"],
        correctAnswer: "<script>"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        possibleAnswers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
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
        title: "How to write an IF statement for executing some code if "i" is NOT equal to 5?:",
        possibleAnswers: ["if i <> 5", "if (i <> 5)", "if i =! 5 then ", "if (i != 5) "],
        correctAnswer: "if (i != 5) "
    },
    {
        title: "How do you round the number 7.25, to the nearest integer?:",
        possibleAnswers: ["Math.rnd(7.25)", "rnd(7.25)", "round(7.25)", "Math.round(7.25)"],
        correctAnswer: "Math.round(7.25) "
    },
];
// Declared variables
var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var quizContent = document.querySelector("#quizContent");
var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startingTime");

// Seconds left is 15 seconds per question:
var secondsLeft = 80;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 8;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    quizContent.innerHTML = "";
    ulCreate.innerHTML = "";
    // Appends question title only
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].possibleAnswers;
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
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].correctAnswer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].correctAnswer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    quizContent.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    quizContent.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    quizContent.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizContent.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizContent.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizContent.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizContent.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizContent.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

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
                everyScores = JSON.parse(everyScores);
            }
            everyScore.push(finalScore);
            var newScore = JSON.stringify(everyScores);
            localStorage.setItem("everyScore", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}