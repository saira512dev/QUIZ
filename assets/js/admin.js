const SERVER = "https://quiz-api-100devs.herokuapp.com";
const rowContainer = document.querySelector(".rows");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const submitQuestionButton = document.querySelector(".submit_question");
const question = document.querySelector("#question");
const choices = document.querySelector("#choices");
const answer_index = document.querySelector("#answer_index");
const info = document.querySelector("#info");
const errorsBox = document.querySelector(".errors")

async function getQuestions() {
    const res = await fetch(`${SERVER}/api/questions/all`);
    const data = await res.json();
    displayQuestions(data)
}
getQuestions()

function displayQuestions(questions){
	console.log(questions)
	if(questions.length!==0){
		let i = 0;
		for (const eachQuestion of questions) {
			i++;
			//let row = document.createElement("div");
			//row.classList.add("rows_content")

			let row1 = document.createElement("div");
			row1.classList.add("row")
			let content1 = document.createElement("h4");
			content1.innerText = i;
			content1.classList.add("shrink","small");
			let row2 = document.createElement("div");
			let content2 = document.createElement("h4");
			content2.innerText = eachQuestion.question;
			row2.classList.add("row")
			let row3 = document.createElement("div");
			row3.classList.add("rows");
			row3.classList.add("actions");
			let view = document.createElement("div");
			view.innerHTML = "<i class='fa fa-eye' aria-hidden='true'></i>"
			let edit = document.createElement("div");
			edit.innerHTML = "<i class='fa fa-pen' aria-hidden='true'></i>"
			let del = document.createElement("div");
			del.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>"
			row1.appendChild(content1);
			section1.appendChild(row1)
			row2.appendChild(content2);
			section2.appendChild(row2)
			row3.appendChild(view)
			row3.appendChild(edit)
			row3.appendChild(del)
			section3.appendChild(row3)
		
		}
	} else {
		let message = document.createElement("h4");
		message.innerText = "No Questions Here Yet!!";
	}
}

submitQuestionButton.addEventListener("click",submitQuestion)
function submitQuestion(e){
	e.preventDefault();
	if (!question.value || !choices.value || !info.value || !answer_index.value ) {
    errorsBox.classList.remove("hide");
    errorsBox.innerHTML = "Please Make sure all Fields are filled with VALID entries";
    return;
  }
  else {
    errorsBox.classList.add("hide");
  console.log(question.value,choices.value,answer_index.value,info.value)
	const newQuestion = {
		question: question.value,
		choices: choices.value.split(','),
		answer_index:answer_index.value,
		info: info.value
	}
	try {
		fetch(`${SERVER}/api/questions/add`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newQuestion)
		}).then((res) => {
			if (res) return res.json();
		})
		.then((response) => {
			console.log(response)
			window.location.href = "admin.html"
		})
	} catch(err){
		errorsBox.classList.remove("hide");
    errorsBox.innerHTML = err;
		setTimeout(() => {
			errorsBox.classList.add("hide")
			errorsBox.innerHTML = ""
		}),3000
	}
	
}
}

