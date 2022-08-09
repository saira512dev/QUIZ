const SERVER = "https://quiz-api-100devs.herokuapp.com";

let id = window.location.href.split("=")[1];
try {
  fetch(`${SERVER}/api/questions/view/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res) return res.json();
    })
    .then((data) => {
      console.log(data);

      const questionHolder = document.querySelector(".quiz-question");
      const choiceMainHolder = document.querySelector(".quiz-options");
      const firstChoiceHolder = document.querySelector(".answer-options0");
      const secondChoiceHolder = document.querySelector(".answer-options1");
      const thirdChoiceHolder = document.querySelector(".answer-options2");
      const fourthChoiceHolder = document.querySelector(".answer-options3");
      const infoHolder = document.querySelector(".learn-more");
      console.log(questionHolder);
      questionHolder.innerText = data[0].question;
      for (const option in data[0].choices) {
        choiceMainHolder.innerHTML += `<li class=" answer">${data[0].choices[option]}</li>`;
      }
      infoHolder.innerHTML = "Info : " + data[0].info;
    });
} catch (err) {
  console.log(err.status);
}
