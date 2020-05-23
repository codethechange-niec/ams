
function renderStudents(res) {

	let students = res.list;
	let studentDropdown = dropdownContainer.getElementsByClassName("dropdown-student")[0]

	for(let student of students) {
		studentDropdown.insertAdjacentHTML("beforeend", `<option value="${student}">${student}</option>`)
	}

}


function getStudents(event) {

	let dropdownContainer = event.target.parentNode;

	console.log("section", dropdownContainer.getElementsByClassName("dropdown-section")[0].value);

	if(section == dropdownContainer.getElementsByClassName("dropdown-section")[0].value) {
		return
	}

	section = dropdownContainer.getElementsByClassName("dropdown-section")[0].value;
	// console.log(section);
	loadWithParams("POST", "/students", {section: section}, renderStudents)

}