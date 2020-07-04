//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const session = require('express-session')
const dateFns = require('date-fns')

const util = require(__dirname + "/functions");
const defaults = require("./functions").defaults


const TWO_HOURS = 1000*60*60*2;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// database connection
const db = mysql.createConnection({
	host : defaults.DB_HOST,
	user : defaults.DB_USER,
	password : defaults.DB_PASSWORD,
	database : defaults.DATABASE
});


//session
const {
	PORT = 3000,
  SESS_LIFETIME = TWO_HOURS,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'sssh!quiet',
} = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(session({
	name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
		maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}))



app.get("/", (req, res) => {
	res.render("home");
});

const teacher = require(__dirname + "/routes/teacherSection.js")
app.use("/teacher", teacher)

const student = require(__dirname + "/routes/student.js")
app.use("/student", student)

const login = require(__dirname + "/routes/login.js")
app.use("/users", login)

const admin = require(__dirname + "/routes/admin.js")
app.use("/admin", admin);


// app.get("/admin", (req, res) => {
//   res.render("admin");
// })


// routes for dropdown lists

// departments list
app.post("/departments", (req, res) => {
	if(app.locals.departments) {
		res.status(200).json({list: app.locals.departments});
	} else {
		res.status(404).json({err: "departments array not found"})
	}
})

// sections list
app.post("/sections", (req, res) => {

	let {department} = req.body;

	if(!department) {
		return res.status(400).json({
			err: "department not given"
		})
	}

	db.query(`select distinct(SUBSTRING_INDEX(section, " ", 1)) as section from department_${department.toLowerCase()}`, (err, result) => {

		if(err) {
			// console.log(err)
			if(err.errno == 1146) {
				res.status(406).json({
					err: "department doesn't exists"
				})
			}
			else {
				res.status(500).json({
					err: "Internal Server Error"
				})
			}
		}
		else {

			let temp = [];
			for(let elem of result) {
				temp.push(elem.section)
			}

			// console.log(temp)

			res.status(200).json({
				list: temp
			})
		}

	})

})

// students list
app.post("/students", (req, res) => {

	let {section} = req.body;

	if(!section) {
		return res.status(400).json({
			err: "section not given"
		})
	}

	db.query(`select studentRollNo from section_${section.toLowerCase()}`, (err, result) => {

		if(err) {
			// console.log(err)
			if(err.errno == 1146) {
				res.status(406).json({
					err: "section doesn't exists"
				})
			}
			else {
				res.status(500).json({
					err: "Internal Server Error"
				})
			}
		}
		else {

			let temp = [];
			for(let elem of result) {
				temp.push(elem.studentRollNo.slice(1))
			}

			// console.log(temp)

			res.status(200).json({
				list: temp
			})
		}

	})

})

// faculty list
app.post("/faculties", (req, res) => {

	let {department} = req.body;

	db.query(`select userId, name from users where department='${department}' and userType='teacher'`, (err, result) => {
		if(err) {
			res.status(500).json({
				err: "Internal Server Error"
			})
		}
		else {
			let temp = result.map(elem => {return {name: elem.name, value: elem.userId} });

			console.log("Faculty List:", temp)

			res.status(200).json({
				list: temp
			})
		}
	})

})

// time table row
app.post("/tableRow", (req, res) => {

	// let date;

	let {facultyId, date} = req.body;


	if(!date) {
		date = new Date()
	}
	else {
		date = date.split("-").map(el => Number(el));
		date = new Date(date[0], date[1]-1, date[2]);
	}

	let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	console.log("here", facultyId, dateFns.format(date, "yyyy-MM-dd"), date.getDay())

	db.query(`select lec1, lec2, lec3, lec4, lec5, lec6, lec7 from teacher_${facultyId} where day_no=${date.getDay()}`, (err, result) => {
		if(err) {
			console.log(err)
			res.status(500).json({
				err: "Internal Server Error"
			})
		}
		else if(result.length == 0) {
			res.status(404).json({
				list: []
			})
		}
		else {

			let temp = [];
			for(let key of Object.keys(result[0])) {
				if(result[0][key] != "-")
					temp.push(`${result[0][key]} Lecture ${key[key.length-1]}`)
			}

			console.log("table rows:", temp)

			res.status(200).json({
				list: temp
			})
		}
	})

})



app.get('/practice', (req, res) => {

	// console.log(req);

	res.render("practice.ejs");

})

app.post("/practice", (req, res) => {
	// console.log("body:", req.body);
	// res.redirect("/practice");

	res.status(404).json({
		err: "Not Found"
	})

})





app.listen(3000, (req, res) => {
	console.log("server started at port 3000 \nhttp://localhost:3000");

	console.log("Enviroment variables:");

	console.log("database name:", defaults.DATABASE);
	console.log("database user:", defaults.DB_USER);
	console.log("database password:", defaults.DB_PASSWORD);
	console.log("database host:", defaults.DB_HOST);

	var dbEnv = ["DATABASE", "DB_USER", "DB_PASSWORD", "DB_HOST"];

	for(let i of dbEnv) {
		console.log(defaults[i])
		if(typeof defaults[i] === "undefined") {
			console.log("Enviroment variable:", i, "not given");
			return;
		}
	}

	db.connect((err) => {
		if(err) {
			console.log("Connection failed, check the database connection parameters");
			console.log("<<<<<<<<<<<<<<ERROR:",err);
		} else {
			console.log("Database connection successful")
		}
	})


	//setting departments in list
	app.locals.departments = ["IT", "CSE"];

});
