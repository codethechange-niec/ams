load("POST", "/departments", renderList, {dropdown: document.getElementById("department")});

function renderDepartments(response) {
	let departmentDropdowns = document.querySelectorAll("#dropdown-department");

	for(let department of response.list) {
		dropdown.insertAdjacentHTML("beforeend", `<option value="${department}">${department}</option>`)
	}

}

function renderList(res, args) {

	console.log("response", res)

	let items = res.list;
	// let dropdown = dropdownContainer.getElementsByClassName(args.dropdown)[0]

	if(typeof items[0] == "object")
		items.unshift({name: " ", value: ""})
	else
		items.unshift("")

	for(let item of items) {
		if(typeof item == "object")
			args.dropdown.insertAdjacentHTML("beforeend", `<option value="${item.value}">${item.name}</option>`)
		else
			args.dropdown.insertAdjacentHTML("beforeend", `<option value="${item}">${item}</option>`)
	}

}


function getFaculty() {

	var departmentDropdown = document.getElementById("department");
	var facultyDropdown = document.getElementById("faculty");
	var secSubLecDropdown = document.getElementById("sec-sub-lec");


	while(facultyDropdown.childNodes.length) {
		facultyDropdown.removeChild(facultyDropdown.childNodes[0])
	}

	while(secSubLecDropdown.childNodes.length) {
		secSubLecDropdown.removeChild(secSubLecDropdown.childNodes[0])
	}


	loadWithParams("POST", "/faculties", {department: departmentDropdown.value}, renderList, {dropdown: facultyDropdown});

	// for substitute teacher
	loadWithParams("POST", "/faculties", {department: departmentDropdown.value}, renderList, {dropdown: document.getElementById("substitute")});

}

function getSecSubLec() {

	var departmentDropdown = document.getElementById("department")
	var facultyDropdown = document.getElementById("faculty");
	var secSubLecDropdown = document.getElementById("sec-sub-lec");
	var dateInput = document.getElementById("date")

	while(secSubLecDropdown.childNodes.length) {
		secSubLecDropdown.removeChild(secSubLecDropdown.childNodes[0])
	}

	loadWithParams("POST", "/tableRow",
	{
		// department: departmentDropdown.value,
		facultyId: facultyDropdown.value,
		date: dateInput.value
	},
	renderList,
	{
		dropdown: document.getElementById("sec-sub-lec")
	})

}