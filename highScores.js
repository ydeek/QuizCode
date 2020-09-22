
// variables are decleared here
var highScore = document.querySelector("#highScore");
var previousPage = document.querySelector("#previousPage");
var remove = document.querySelector("#remove");

// to clear scores event listtener is added
remove.addEventListener("click", function () {
    localStorage.clear(); p
    location.reload();
});
// 
var everyScore = localStorage.getItem("everyScore");
everyScore = JSON.parse(everyScore);

if (everyScore !== null) {

    for (var i = 0; i < everyScore.length; i++) {


        var createLi = document.createElement("li");
        createLi.textContent = everyScore[i].initials + " " + everyScore[i].score;
        highScore.appendChild(createLi);

    }
}
// here the event listemr moves to index.html file 
previousPage.addEventListener("click", function () {
    window.location.replace("./index.html");
});