//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const util = require(__dirname + "/../functions.js")

const router = express.Router();

router.get("/checkAttendance", (req, res) => {
  res.render("checkAttendance", {error_msg: ""});
});

router.post("/checkAttendance", (req, res) => {
  let rollNo = req.body.rollNo;
  let section = req.body.section.toLowerCase();
  let department = req.body.department.toLowerCase();
	let attendanceList = [];

	console.log(rollNo, section, department)

  util.getConnection().query(`select studentName, studentRollNo from section_${section} where studentRollNo like '%${rollNo}'`, async (err, result) => {
		if(err) {
			console.log(err);

			if(err.errno == 1146) {
				res.send(`
				<h1> Invalid section </h1>
				`)
			}

    }
    else if(result.length == 0) {
      console.log("Invalid Stundent Roll Number");
      res.render("home", {error_msg: "Stundent Roll Number not listed in given department and section"})
      return;
    }
    else {

      let temp = result[0].studentRollNo[0].toUpperCase();

      util.getConnection().query(`select subject from department_${department} where section='${section}' or section='${section} ${temp}'`, async (err, result) => {

        if(err) {

          if(err.errno == 1146)
            res.render("home", {error_msg: "Invalid department"});
          else {
            console.log(err);
            res.send(err.code)
          }

          return;
        }
        else if(result.length === 0) {
          res.render("home", {error_msg: "Invalid section "});
          return;
        }
        console.log(result);
        let subjectList = result;
        let presentDays;
        let totalLectures;
        let percentage;
        let grp='';

        for(let i=0; i<subjectList.length; i++) {

          if(subjectList[i].subject.indexOf("LAB") == -1) {
            grp = "";
          } else {
            grp = temp;
          }

          totalLectures = await util.getTotalLectures(subjectList[i].subject, section+" "+grp, department)

          if(totalLectures == 0) {
            presentDays="No attendance taken";
            percentage="NA";
          } else {
            presentDays = await util.getAttendance(temp.toLowerCase() + rollNo, section, subjectList[i].subject)
            percentage = Number.parseFloat(presentDays*100/totalLectures).toPrecision(4);
          }

          attendanceList.push([subjectList[i].subject, presentDays, percentage])
          console.log(attendanceList);
        }
        res.render("attendanceList", {attendanceList: attendanceList});
      })
    }
  });
});

module.exports = router;
