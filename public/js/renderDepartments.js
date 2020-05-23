
function renderDepartments(response) {
	let departmentDropdowns = document.querySelectorAll(".dropdown-department");

	for(let dropdown of departmentDropdowns) {
		for(let department of response.list) {
			dropdown.insertAdjacentHTML("beforeend", `<option value="${department}">${department}</option>`)
		}
	}

}

load("POST", "/departments", renderDepartments);
