//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const session = require('express-session')
const util = require(__dirname + "/functions");
const dotenv = require("dotenv");

const TWO_HOURS = 1000*60*60*2;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// loading enviroment variables
let envResult = dotenv.config();
console.log("Dotenv msg:", envResult)


// database connection
const db = mysql.createConnection({
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DATABASE
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


app.get("/admin", (req, res) => {
  res.render("admin");
})


//departments list
app.post("/departments", (req, res) => {
	if(app.locals.departments) {
		res.json({list: app.locals.departments});
	} else {
		res.json({err: "departments array not found"})
	}
})

app.get('/practice', (req, res) => {

	// console.log(req);

	res.render("practice.ejs");

})

app.post("/practice", (req, res) => {
	console.log("body:", req.body);
	res.redirect("/practice");
})


app.listen(3000, (req, res) => {
	console.log("server started at port 3000 \nhttp://localhost:3000");

	console.log("Enviroment variables:");

	console.log("database name:", process.env.DATABASE);
	console.log("database user:", process.env.DB_USER);
	console.log("database password:", process.env.DB_PASSWORD);
	console.log("database host:", process.env.DB_HOST);

	var dbEnv = ["DATABASE", "DB_USER", "DB_PASSWORD", "DB_HOST"];

	for(let i of dbEnv) {
		console.log(process.env[i])
		if(typeof process.env[i] === "undefined") {
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
	app.locals.departments = ["IT"];

});
