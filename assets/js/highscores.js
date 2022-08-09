//const scores = JSON.parse(window.localStorage.getItem('user'));
const SERVER = "https://quiz-api-100devs.herokuapp.com";
const scoreListParent = document.querySelector(".highscores-list");
const clearButton = document.querySelector("#clear-highscores");
const scoreContainer = document.querySelector(".score-container");

async function setScores(){
  const res = await fetch(`${SERVER}/api/scores/all`);
  const data = await res.json();
  if (data.length !== 0) {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.scope = "row";
    heading_1.innerHTML = "Rank";
    let heading_2 = document.createElement("th");
    heading_2.scope = "col";

    heading_2.innerHTML = "Name";
    let heading3 = document.createElement("th");
    // heading_3.scope="col";

    heading3.innerHTML = "Score";
    let heading4 = document.createElement("th");
    heading3.classList.add("shrink-3")
    // heading_4.scope="col";

    heading4.innerHTML = "Time";
    heading4.classList.add("shrink-4")

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading3);
    row_1.appendChild(heading4);

    thead.appendChild(row_1);

    table.appendChild(thead);
    table.appendChild(tbody);
    scoreContainer.appendChild(table);

    let i = 0;
    for (const score of data) {
      i++;
      console.log(score);
      let row_1 = document.createElement("tr");
      let heading_1 = document.createElement("td");
      heading_1.innerText = i;
      let heading_2 = document.createElement("td");
      heading_2.innerText = score.name;
      let heading3 = document.createElement("td");
      heading3.innerText = score.score;
      heading3.classList.add("shrink-3");
      let heading4 = document.createElement("td");
      heading4.innerText = score.time + "s";
      heading4.classList.add("shrink-4");
      row_1.appendChild(heading_1);
      row_1.appendChild(heading_2);
      row_1.appendChild(heading3);
      row_1.appendChild(heading4);

      tbody.appendChild(row_1);
      table.appendChild(tbody);
    }
  } else {
    let message = document.createElement("h4");
    message.innerText = "No Scores Here Yet!!";
    scoreContainer.appendChild(message);
  }
}

setScores();

// clearButton.addEventListener('click',function(){
//     window.localStorage.clear();
//     window.location.replace("highscores.html");
// })
