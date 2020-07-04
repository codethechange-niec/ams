
const express = require("express")
const bodyParser = require("body-parser")
const dateFns = require("date-fns")
const defaults = require("../functions").defaults;
const util = require(__dirname + "/../functions.js")
const db = require("../dbfunctions/admin")

const router = express.Router();


const redirectLogin = function (req, res, next) {

	if(req.session.userType == "admin") {
		next();
	} else {
		if(req.session.userType == "teacher") {
			res.redirect("/teacher/timeTable")
		} else {
			res.redirect("/")
		}
	}
}

router.use(redirectLogin);


// Home
router.get("/", (req, res) => {

	console.log("Admin Home")
	res.render("admin/home");

})


// Ajax routes

// set arrangement
router.post("/arrangement", async (req, res) => {

	console.log(req.body)

	let {department, faculty, date, lectureCell, substitute} = req.body;

	let missingField = "";
	if(!department) missingField = "department"
	else if(!faculty) missingField = "faculty"
	else if(!date) missingField = "date"
	else if(!lectureCell) missingField = "lecture cell"
	else if(!substitute) missingField = "substitute"

	if(missingField) {
		return res.status(406).json({
			missing: {
				name: missingField
			}
		})
	}

	lectureCell = lectureCell.split(" ");

	// configuring for lab attendance
	if(lectureCell.length >= 6) {
		lectureCell[0] += " LAB";
		lectureCell[1] += " " + lectureCell[2];
		lectureCell[3] = lectureCell[6]
	}

	// creating proper js date object
	date = date.split("-");
	date = new Date(date[0], date[1]-1, date[2]);


	// check if any arrangement already present
	let present = await db.getArrangement({
		date: dateFns.format(date, "yyyy-MM-dd"),
		section: lectureCell[1],
		lecture: lectureCell[3]
	})

	if(present.status == -1) {
		return res.status(500).json({
			err: "Internal Server Error"
		})
	}
	else if(present.status == 1) {
		return res.status(409).json({
			error: "Already Present",
			result: present.result[0]
		})
	}


	let created = await db.createArrangement({
		date: dateFns.format(date, "yyyy-MM-dd"),
		department,
		faculty,
		substitute,
		section: lectureCell[1],
		subject: lectureCell[0],
		lecture: lectureCell[3],
		expires: dateFns.format(dateFns.addDays(date, defaults.ARRANGEMENT_EXPIRY), "yyyy-MM-dd")
	})

	if(created.status == 1) {
		res.status(201).json({
			msg: "Arrangement created id: " + created.result.insertId
		})
	}
	else {
		res.status(500).json({
			err: "Internal server error"
		})
	}

})



//teacher base routes
router.get("/teacher", async (req, res) => {
    res.render("admin/teacher");
})

router.post("/teacher/create", async (req, res) => {

	var {teacherName: name, teacherId: id, teacherPassword: password, department} = req.body;

	console.log(name, id, password, department);

	//insert new user entry
	var inserted = await db.createUser({id: id, name: name, password: password, department: department, type: 'teacher'});
	if(inserted.status == -1) {
		return res.send(`Error <a href="/admin/teacher">go back here</a>`);
	}

	//create table statement
	var created = db.createTimeTable(id);
	if(created.status == -1) {
		return res.send(`Error <a href="/admin/teacher">go back here</a>`);
	}


	//inserting rows(days data)
	var filled = await db.fillTimeTable(id, req.body);

	if(filled.status == -1) {
		return res.send(`Error <a href="/admin/teacher">go back here</a>`);
	}


	//assign teacher sections in department
	var timeTable = await db.getTimeTable(id);

	if(timeTable.status == 1) {

		var result = timeTable.result;

		let inputArr = [];

      for(let i=0; i<result.length; i++) {
        delete result[i].day_no;
        delete result[i].day;
        for(let prop in result[i]) {

          console.log(result[i][prop])

          if(result[i][prop] != '-') {
            let cell = result[i][prop].split(' ');
            let subject = cell[0];
            let section = cell[1];

            if(cell.length>2) {
              section += ' ' + cell[2];
              subject += ' ' + cell[3];
            }

            if(inputArr.findIndex(element => element.section==section && element.subject==subject) == -1)
              inputArr.push({section: section, subject: subject});
          }

        }
      }

      console.log(inputArr);

      for(let i=0; i<inputArr.length; i++) {

				var pushed = await db.assignClass({department: department, id: id, section: inputArr[i].section, subject: inputArr[i].subject});

				if(pushed.status == -1)
					return res.send(`Error <a href="/admin/teacher">go back here</a>`);

      }
	}
	else {
		return res.send(`Error <a href="/admin/teacher">go back here</a>`);
	}


	res.redirect("/admin/teacher");
})

router.post("/teacher/delete", async (req, res) => {

	var {teacherId: id, department} = req.body;

	//TODO: lowercase the department

	//delete from users table
	var deletedFromUsers = await db.deleteUser(id);

	//delete from department table
	var deletedFromDepartment = await db.unassignClass(id, department.toLowerCase());

	//delete time table
	var deletedTimeTable = await db.deleteTimeTable(id);

	console.log("delete request for id:", id)

	res.send(`{"status": 1, "id": "${id}", "department": "${department}"}`);

})


router.get("/teacher/getDetails/:teacherId/:department", async (req, res) => {

	var {teacherId: id, department} = req.params;

	var userCredentials = await db.getDetails(id, department);

	if(userCredentials.status == -1) {
		return res.send(`{"status": -1}`);
	}
	else if(userCredentials.status == 0) {
		return res.send(`{"status": 0}`);
	}
	else {

		var details = {};

		details.userCredentials = userCredentials.result[0];

		var assignedSections = await db.getAssignDetails(id, department.toLowerCase());

		if(assignedSections.status == -1) {
			return res.send(`{"status": -1}`);
		}
		else if(assignedSections.status = 0) {
			return res.send(`{"status": 0}`);
		}
		else {
			details.assignedSections = assignedSections.result;

			res.send(`{"status": 1, "result": ${JSON.stringify(details)}}`);
		}

	}

})


router.get("/teacher/getAllDetails/:teacherId/:department", async (req, res) => {

	var {teacherId: id, department} = req.params;

	console.log(id, department)

	var userCredentials = await db.getDetails(id, department, password=1);

	if(userCredentials.status == -1) {
		return res.send(`{"status": -1}`);
	}
	else if(userCredentials.status == 0) {
		return res.send(`{"status": 0}`);
	}
	else {

		var details = {};

		details.userCredentials = userCredentials.result[0];

		var timeTable = await db.getTimeTable(id);

		if(timeTable.status == -1) {
			return res.send(`{"status": -1}`);
		}
		else if(timeTable.status = 0) {
			return res.send(`{"status": 0}`);
		}
		else {
			details.timeTable = timeTable.result;

			res.send(`{"status": 1, "result": ${JSON.stringify(details)}}`);
		}

	}

})




//section base routes

router.get("/section", (req, res) => {
	res.render("admin/sections")
})


router.post("/section/create", async (req, res) => {

	console.log(req.body)

	var {section_name: name, section_department: department} = req.body;

	delete req.body.section_name;
	delete req.body.section_department;

	var arr = [];

	var keys = Object.keys(req.body);

	console.log("keys:", keys)

	if(keys[0].startsWith("rollNo_")) {

		//form details are valid
		var details = {};
		details.sectionName = name;
		details.students = [];
		for(let i=0; i<keys.length; i+=3) {
			console.log(`${req.body[keys[i+2]]}${req.body[keys[i]]}`);
			details.students.push({rollNo: `${req.body[keys[i+2]].toLowerCase()}${req.body[keys[i]]}`, name: req.body[keys[i+1]]});
		}


		//create section table
		var created = await db.createSectionTable(name);

		if(created.status == -1) {
			return res.send(`Error <a href="/admin/section">go back here</a>`);
		}
		console.log("Section created")

		//fill section table
		var filled = await db.fillSection(details);

		if(filled.status == -1) {
			return res.send(`Error <a href="/admin/section">go back here</a>`)
		}
		console.log("section filled")

		//create section attendance table
		created = await db.createSectionAttendanceTable(details);

		if(created.status == -1) {
			return	res.send(`Error <a href="/admin/section">go back here</a>`)
		}
		else {
			res.redirect("/admin/section")
			console.log("attendance table created")
		}

	} else {

		//invalid, something happened in client side
		res.send("ERROR, try refilling and resubmitting");
	}


	console.log(keys);

	// res.redirect("/admin/sections")

});


//TODO: make it for AJAX request type
router.post("/section/delete", async (req, res) => {

	var {sectionName} = req.body;

	//delete section table
	var deleted = await db.deleteSection(sectionName);

	if(deleted.status == -1) {
		return res.send(`Error <a href="/admin/section">go back here</a>`);
	} else {

		console.log(`section ${sectionName} table deleted`)
		deleted = await db.deleteSectionAttendance(sectionName);

		if(deleted.status == -1) {
			return res.send(`Error <a href="/admin/section">go back here</a>`);
		} else {

			console.log(`section ${sectionName} attendance table deleted`)
			res.redirect("/admin/section");
		}
	}
})


router.get("/section/getDetails/:name/:department", async (req, res) => {

	let {name, department} = req.params;

	console.log(name, department);

	let result = await db.getSection(name);

	if(result.status == -1) {
		//TODO: if have an error message then send along it
		return res.json({
			status: -1,
			msg: result.error.errno==1146?"Section Not Found":""
		});
	} else {

		let details = {};
		if(result.status == 0) {
			details.status = 0;
			details.students = [];
		} else {
			details.status = 1;
			details.students = result.result;
		}

		res.send(details);

	}
})

module.exports = router;