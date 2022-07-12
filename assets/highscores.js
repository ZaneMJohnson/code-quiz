var scoresList = JSON.parse(localStorage.getItem("scoresList"));
var scoresListEl = document.querySelector("#scoreslist");
var buttonsEl = document.querySelector("#buttons");

console.log(scoresList);

displayScores();

function displayScores() {
    var newList = scoresList.sort((a, b) => b.score-a.score);
    for (let i = 0; i < newList.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "scoreitem");
        li.textContent = ((i+1) + ". " + newList[i].initials + " - " + newList[i].score )
        scoresListEl.appendChild(li);
      }
}

buttonsEl.addEventListener("click", function(event) {
    if (event.target.matches("#back")) {
        window.location.href = "./index.html";
    }
});

buttonsEl.addEventListener("click", function(event) {
    if (event.target.matches("#clearscores")) {
        scoresList = [];
        localStorage.removeItem("scoresList");
        scoresListEl.innerHTML = "";
    }
});