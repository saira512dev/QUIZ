const SERVER = "https://quiz-api-100devs.herokuapp.com";

const form = document.querySelector("form");
const errorsBox = document.querySelector(".errors");

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
      console.log(data[0]);
      document.getElementById("id").value = data[0]._id;
      document.getElementById("question").value = data[0].question;
      document.getElementById("choices").value = data[0].choices.join(",");
      document.getElementById("answer_index").value = data[0].answer_index;
      document.getElementById("info").value = data[0].info;
    });
} catch (err) {
  console.log(err.status);
}

function dealErrors(err) {
  errorsBox.classList.remove("hide");
  errorsBox.innerHTML = err;
  setTimeout(() => {
    errorsBox.classList.add("hide");
    errorsBox.innerHTML = "";
  }, 7000);
}

form.onsubmit = submitQuestion;
function submitQuestion(e) {
  e.preventDefault();
  errorsBox.classList.add("hide");
  let formData = new FormData(form);
  try {
    fetch(`${SERVER}/api/questions/edit/id/${formData.get("id")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question:
          formData.get("question") == "" ? null : formData.get("question"),
        choices:
          formData.get("choices") == ""
            ? null
            : formData.get("choices").split(","),
        answer_index:
          formData.get("answer_index") == ""
            ? null
            : formData.get("answer_index"),
        info: formData.get("info") == "" ? null : formData.get("info"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let errorStatement = "";
        if (data.errors) {
          data.errors.forEach((err) => {
            errorStatement += `<li>${err.msg}</li>`;
          });
          dealErrors(errorStatement);
        } else window.location.href = "admin.html";
      });
  } catch (err) {
    dealErrors(err);
  }
}
