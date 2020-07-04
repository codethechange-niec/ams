// triggering departments manually
load("POST", "/departments", renderDepartments);

function renderDepartments(response) {

	let departmentDropdown = dropdownContainer.getElementsByClassName("dropdown-department")[0]

	response.list.unshift(" ")
	for(let department of response.list) {
		departmentDropdown.insertAdjacentHTML("beforeend", `<option value="${department}">${department}</option>`)
	}

	departmentDropdown.onchange = getSections;

	getSections();

}



function renderSections(res) {

	let sections = res.list;
	let sectionDropdown = dropdownContainer.getElementsByClassName("dropdown-section")[0]

	sections.unshift(" ")

	for(let section of sections) {
		sectionDropdown.insertAdjacentHTML("beforeend", `<option value="${section}">${section}</option>`)
	}

	getStudents();


}

function getSections(event) {

	let departmentDropdown = dropdownContainer.getElementsByClassName("dropdown-department")[0];
	let sectionDropdown = dropdownContainer.getElementsByClassName("dropdown-section")[0];
	let studentDropdown = dropdownContainer.getElementsByClassName("dropdown-student")[0];

	// clear options
	while(sectionDropdown.childNodes.length) {
		sectionDropdown.removeChild(sectionDropdown.childNodes[0]);
	}
	while(studentDropdown.childNodes.length) {
		studentDropdown.removeChild(studentDropdown.childNodes[0]);
	}

	// if(event) {
	// 	dropdownContainer = event.target.parentNode;
	// }
	// console.log("Dropdowncontainer", dropdownContainer);

	// if(department == dropdownContainer.getElementsByClassName("dropdown-department")[0].value) {
	// 	return
	// }

	department = departmentDropdown.value;
	// console.log(department);
	loadWithParams("POST", "/sections", {department: department}, renderSections)

}


function renderStudents(res) {

	let students = res.list;
	let studentDropdown = dropdownContainer.getElementsByClassName("dropdown-student")[0]

	students.unshift(" ");

	for(let student of students) {
		studentDropdown.insertAdjacentHTML("beforeend", `<option value="${student}">${student}</option>`)
	}

}


function getStudents(event) {

	let sectionDropdown = dropdownContainer.getElementsByClassName("dropdown-section")[0];
	let studentDropdown = dropdownContainer.getElementsByClassName("dropdown-student")[0];

	// clear options
	while(studentDropdown.childNodes.length) {
		studentDropdown.removeChild(studentDropdown.childNodes[0]);
	}

	console.log("section", sectionDropdown.value);

	// if(section == dropdownContainer.getElementsByClassName("dropdown-section")[0].value) {
	// 	return
	// }

	section = sectionDropdown.value;
	// console.log(section);
	loadWithParams("POST", "/students", {section: section}, renderStudents)

}