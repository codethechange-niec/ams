//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const session = require('express-session')
const util = require(__dirname + "/functions");

const db = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "Root@987",
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
app.use("/login", login)

//
// app.get("/login", redirectHome, (req, res) => {
//   // if(loggedIn) res.redirect("/");
//   res.render("login", {error_msg: ""});
// });
//
// app.post("/login", redirectHome, (req, res) => {
//   let userId = req.body.userid;
//   let password = req.body.password;
//   db.query(`select userID, userType, department from users where userid='${userId}' and password='${password}'`, (err, result) => {
//     if(err) throw err;
//     if(result.length === 0) {
//       res.render("login", {error_msg: "Invalid username or password"});
//     }
//     else {
//       console.log("User " + userId + " logged in");
//       req.session.userId = userId;
//       req.session.department = result[0].department;
//       console.log(req.session.department);
//       if(result[0].userType.toLowerCase === 'admin') {
//         req.session.adminIN = true;
//         res.redirect("/admin");
//       }
//       else {
//         res.redirect("/teacher/timeTable");
//         req.session.userSections = []
//         db.query(`select * from teacher_${req.session.userId}`, (err, result) => {
//           //console.log(result);
//           for(let i=0; i<result.length; i++) {
//             for(let j=1; j<8; j++) {
//               util.addElement(req.session.userSections, result[i][`lec${j}`]);
//             }
//           }
//           req.session.save();
//           console.log(req.session.userSections);
//         });
//       }
//     }
//   });
// });

app.get("/admin", (req, res) => {
  res.render("admin");
})

app.get('/practice', (req, res) => {
  res.render("sectionDetails", {section: "s10"});
})

function addUser(userID, password) {
  db.query(`insert into users values('${userID}', '${password}', "Teacher")`)
}

function updateDepartment(userID, username, details) {
  details.forEach((value) => {
    db.query(`insert into department values('${userID}', '${username}', '${value[0]}', '${value[1]}', 0)`)
  })
}

function createTimeTable(userID) {
  db.query(`create table `)
}

app.listen(3000, (req, res) => {
  console.log("server started at port 3000 \nhttp://localhost:3000");
});
