//const scores = JSON.parse(window.localStorage.getItem('user'));
const SERVER = "https://quiz-api-100devs.herokuapp.com";
const scoreListParent = document.querySelector(".highscores-list");
const clearButton = document.querySelector("#clear-highscores");
const scoreContainer = document.querySelector(".score-container");

fetch(`${SERVER}/api/scores/all`)
  .then((res) => res.json())
  .then((data) => {
    if (data) {
      let i = 0;
      for (const score of data) {
        i++;
        console.log(score)
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        let position = document.createElement("h3")
        position.innerHTML = i;;
        let name = document.createElement("h3")
        name.innerHTML = score.name;
        let userScore = document.createElement("h3")
        userScore.classList.add("extra");
        userScore.innerHTML = score.score;
        let time = document.createElement("h3")
        time.classList.add("extra");
        time.innerHTML = score.time+"s";
        newRow.appendChild(position);
        newRow.appendChild(name);
        newRow.appendChild(userScore);
        newRow.appendChild(time);

        scoreContainer.appendChild(newRow);

        // li.appendChild(document.createTextNode(`${i}    ${score.name}    ${score.score}    ${score.time}`));
      }
      //    newRow = ` <div class="row">
      //             <h3>Position</h3>
      //             <h3>Name</h3>
      //             <h3>Score</h3>
      //             <h3>Time</h3>
      //         </div>`

      // let i = 0;
      // var li = document.createElement("li");
      // li.appendChild(document.createTextNode(`Position    Name    Score    Time(seconds)`));
      // scoreListParent.appendChild(li);
      // for(const score of data){
      //     i++
      //     var li = document.createElement("li");
      //     li.appendChild(document.createTextNode(`${i}    ${score.name}    ${score.score}    ${score.time}`));
    } else {
      newRow.appendChild(
        document
          .createElement("h3")
          .appendChild(document.createTextNode("No Score Added"))
      );
      scoreContainer.appendChild(newRow);
    }
  });

// clearButton.addEventListener('click',function(){
//     window.localStorage.clear();
//     window.location.replace("highscores.html");
// })
