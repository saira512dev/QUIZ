const SERVER = "https://quiz-api-100devs.herokuapp.com";
const rowContainer = document.querySelector(".rows");



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
			let row = document.createElement("div");
			row.classList.add("rows_content")

			let col1 = document.createElement("div");
			let content1 = document.createElement("h4");
			content1.innerText = i;
			content1.classList.add("shrink");
			let col2 = document.createElement("div");
			let content2 = document.createElement("h4");
			content2.innerText = eachQuestion.question;
			let col3 = document.createElement("div");
			col3.classList.add("actions");
			let view = document.createElement("div");
			view.innerHTML = "<i class='fa fa-eye' aria-hidden='true'></i>"
			let edit = document.createElement("div");
			edit.innerHTML = "<i class='fa fa-pencil' aria-hidden='true'></i>"
			let del = document.createElement("div");
			del.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>"
			
			col1.appendChild(content1);
			col2.appendChild(content2);
			col3.appendChild(view);
			col3.appendChild(edit);
			col3.appendChild(del);
			row.appendChild(col1)
			row.appendChild(col2)
			row.appendChild(col3);

			rowContainer.appendChild(row)
		}
	} else {
		let message = document.createElement("h4");
		message.innerText = "No Questions Here Yet!!";
		rowContainer.appendChild(message);
	}

}

