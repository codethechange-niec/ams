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
  let section = req.body.section;
  let department = req.body.department;
  let attendanceList = [];

  util.getConnection().query(`select subject from department_${department} where section='${section}'`, async (err, result) => {

    if(!result) {
      res.render("home", {error_msg: "Invalid department"});
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

    util.getConnection().query(`select studentName from section_${section} where studentRollNo='${rollNo}'`, async (err, result) => {
      if(result.length == 0) {
        console.log("Invalid Stundent Roll Number");nodemo
        res.render("home", {error_msg: "Stundent Roll Number not listed in given department and section"})
        return;
      }
      else {
        for(let i=0; i<subjectList.length; i++) {

          presentDays = await util.getAttendance(rollNo, section, subjectList[i].subject)
          totalLectures = await util.getTotalLectures(subjectList[i].subject, section, department)
          let percentage = Number.parseFloat(presentDays*100/totalLectures).toPrecision(4);
          attendanceList.push([subjectList[i].subject, presentDays, percentage])
          console.log(attendanceList);
        }
        res.render("attendanceList", {attendanceList: attendanceList});
      }
    })

  });
});

module.exports = router;
