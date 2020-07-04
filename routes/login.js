//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const util = require(__dirname + "/../functions.js")
const db = require(__dirname + "/../dbfunctions/teacher.js")

const router = express.Router();

const redirectLogin = (req, res, next) => {
  if(!req.session.userType) {
    res.redirect("/")
  }
  else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userType == "teacher") {
    res.redirect('/teacher/timeTable')
	}
	else if(req.session.userType == "admin") {
		res.redirect('/admin')
	}
  else {
    next()
  }
}

router.get("/", redirectHome, (req, res) => {
  // if(loggedIn) res.redirect("/");
  res.redirect("/")
});

router.post("/", redirectHome, (req, res) => {
  let userId = req.body.userid;
  let password = req.body.password;
  util.getConnection().query(`select userID, Name, userType, department from users where userid='${userId}' and password='${password}'`, async (err, result) => {
    if(err) throw err;
    if(result.length === 0) {
			console.log("Invalid username or password")
      res.render("home", {error_msg: "Invalid username or password"});
    }
    else {
      console.log("User " + JSON.stringify(result) + " logged in");
      req.session.userId = userId;
      req.session.userName = result[0].Name;
			req.session.department = result[0].department.toLowerCase();
			req.session.userType = result[0].userType.toLowerCase();

			if(req.session.userType == "admin") {
				return res.redirect("/admin");
			}

      var subjects = await db.getSubjects(req.session.department, req.session.userId)

      if(subjects != -1 && subjects != 0) {
        console.log(subjects);
        req.session.subjects = subjects;
      }

      console.log(req.session.department);
      if(result[0].userType.toLowerCase === 'admin') {
        req.session.adminIN = true;
        res.redirect("/admin");
      }
      else {
        res.redirect("/teacher/timeTable");
        req.session.userSections = []
        util.getConnection().query(`select * from teacher_${req.session.userId}`, (err, result) => {
          //console.log(result);
          for(let i=0; i<result.length; i++) {
            for(let j=1; j<8; j++) {
              if(result[i][`lec${j}`] != "-") {
                util.addElement(req.session.userSections, result[i][`lec${j}`].split(" ")[1].toUpperCase());
              }
            }
          }
          req.session.save();
          console.log(req.session.userSections);
        });
      }
    }
  });
});


router.post('/logout', redirectLogin, (req, res) => {

  req.session.destroy()
  res.clearCookie(process.env.SESS_NAME)

  res.redirect('/');

})



//AJAX routes
router.post('/checkLogStatus', (req, res) => {

  var obj = {};

  if(req.session.userId) {
    obj.logStatus = 1;
    obj.userType = req.session.userType;
    obj.userName = req.session.userName;
    obj.userId = req.session.userId;
  } else {
    obj.logStatus = 0;
  }

  console.log("log status:", obj)

  res.send(obj);

})

module.exports = router;
