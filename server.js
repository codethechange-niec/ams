//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const session = require('express-session')
const util = require(__dirname + "/functions");

const db = mysql.createConnection({
  host : "localhost",
  user : "ams_user",
  password : "ams@123",
  database : "ams"
});

const TWO_HOURS = 1000*60*60*2;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

db.connect((err) => {
  if(err) throw err;
  console.log("successfully connected to mysql");
});

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

	console.log("enviroment variables:");

	console.log("database name:", process.env.DATABASE);
	console.log("database user:", process.env.DB_USER);
	console.log("database password:", process.env.DB_PASSWORD);
	console.log("database host:", process.env.DB_HOST);


});
