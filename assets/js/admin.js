const SERVER = "https://quiz-api-100devs.herokuapp.com";

const questionContainer = document.querySelector(".question-container");
const submitQuestionButton = document.querySelector(".submit_question");
const errorsBox = document.querySelector(".errors");
const form = document.querySelector("form");

async function getQuestions() {
  try {
    fetch(`${SERVER}/api/questions/all`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res) return res.json();
      })
      .then((response) => {
        console.log(response);
        displayQuestions(response);
      });
  } catch (err) {
    console.log(err.status);
  }
}
getQuestions();

function deleteQuestion(id) {
  console.log(id);
  try {
    fetch(`${SERVER}/api/questions/delete/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res) return res.json();
      })
      .then((response) => {
        console.log(response.status);
        window.location.reload();
      });
  } catch (err) {
    console.log(err.status);
  }
}

function displayQuestions(questions) {
  console.log(questions);
  if (questions.length !== 0) {
			let table = document.createElement("table");
			let thead = document.createElement("thead");
			let tbody = document.createElement("tbody");
			let row_1 = document.createElement("tr");
			let heading_1 = document.createElement("th");
			heading_1.scope = "row";
			heading_1.innerHTML = "S.No.";
			heading_1.classList.add("shrink-3")
			let heading_2 = document.createElement("th");
			heading_2.scope = "col";
			heading_2.colSpan = 3;

	
			heading_2.innerHTML = "Question";
			let heading3 = document.createElement("th");
			// heading_3.scope="col";
	
			heading3.innerHTML = "Actions";
			heading3.classList.add("action-heading")
	
			row_1.appendChild(heading_1);
			row_1.appendChild(heading_2);
			row_1.appendChild(heading3);
	
			thead.appendChild(row_1);
	
			table.appendChild(thead);
			table.appendChild(tbody);
			questionContainer.appendChild(table);

			let i=0;
			for (const question of questions) {
				i++;
				let row_1 = document.createElement("tr");
				let heading1 = document.createElement("td");
				heading1.innerText = i;
				heading1.classList.add("shrink-3");
				let heading_2 = document.createElement("td");
				heading_2.colSpan = 3;
				heading_2.innerText = question.question;
				let heading3 = document.createElement("td");
				heading3.classList.add("actions")
				
				let view = document.createElement("div");
				view.onclick = function () {
					viewQuestion(question._id);
				};
				view.innerHTML = "<i class='fa fa-eye' aria-hidden='true'></i>";
				let edit = document.createElement("div");
				edit.onclick = function () {
					editQuestion(question._id);
				};
				edit.innerHTML = "<i class='fa fa-pen' aria-hidden='true'></i>";
				let del = document.createElement("div");
				del.onclick = function () {
					deleteQuestion(question._id);
				};
				del.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
				
				
				heading3.appendChild(view);
				heading3.appendChild(edit);
				heading3.appendChild(del)
			
				row_1.appendChild(heading1);
				row_1.appendChild(heading_2);
				row_1.appendChild(heading3);
	
				tbody.appendChild(row_1);
				table.appendChild(tbody);
			}
		} else {
			let message = document.createElement("h4");
			message.innerText = "No Questions Here Yet!!";
			questionContainer.appendChild(message);
		}


	// ----------------------------------------------------EXTRA----------------------------------------------
	// 		let i = 0;
  //   let i = 0;
  //   for (const eachQuestion of questions) {
  //     i++;
  //     let mainRowContainer = document.createElement("div");
  //     mainRowContainer.classList.add("mainRow")

  //     let row1 = document.createElement("div");
  //     row1.classList.add("row");
  //     let content1 = document.createElement("h4");
  //     content1.innerText = i;
  //     content1.classList.add("shrink", "small");
  //     let row2 = document.createElement("div");
  //     let content2 = document.createElement("h4");
  //     content2.innerText = eachQuestion.question;
  //     row2.classList.add("row");
  //     let row3 = document.createElement("div");
  //     row3.classList.add("rows");
  //     row3.classList.add("actions");
  //     let view = document.createElement("div");
  //     view.onclick = function () {
  //       viewQuestion(eachQuestion._id);
  //     };
  //     view.innerHTML = "<i class='fa fa-eye' aria-hidden='true'></i>";
  //     let edit = document.createElement("div");
  //     edit.onclick = function () {
  //       editQuestion(eachQuestion._id);
  //     };
  //     edit.innerHTML = "<i class='fa fa-pen' aria-hidden='true'></i>";
  //     let del = document.createElement("div");
  //     del.onclick = function () {
  //       deleteQuestion(eachQuestion._id);
  //     };
  //     del.dataset.id = eachQuestion._id;
  //     del.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
  //     row1.appendChild(content1);
  //     //section1.appendChild(row1);
  //     row2.appendChild(content2);
  //     //section2.appendChild(row2);
  //     row3.appendChild(view);
  //     row3.appendChild(edit);
  //     row3.appendChild(del);
  //     section3.appendChild(row3);
	// 		mainRowContainer.appendChild(section1);
	// 		mainRowContainer.appendChild(section2);
	// 		mainRowContainer.appendChild(section3);
	// 		questionContainer.appendChild(mainRowContainer);

  //   }
  // } else {
  //   let message = document.createElement("h4");
  //   message.innerText = "No Questions Here Yet!!";
  // }

//--------------------EXTRA--------------------------------------------------------	
}



function viewQuestion(id) {
  console.log(typeof id);

  window.location.href = "viewQuestion.html?id=" + id;
}

function editQuestion(id) {
  console.log(typeof id);

  window.location.href = "editQuestion.html?id=" + id;
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
    fetch(`${SERVER}/api/questions/add`, {
      method: "POST",
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
