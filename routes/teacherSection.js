//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const util = require(__dirname + "/../functions.js")
const db = require(__dirname + "/../dbfunctions/teacher.js")
const dateFns = require('date-fns')

const router = express.Router();

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login')
  }
  else {
    next()
  }
}

const sectionAccessibility = (req, res, next) => {

  var selectedSection = req.params.section;

  if(!req.session.userSections.includes(selectedSection)) {
    return res.send("<h2>You cannot access that section</h2>");
  }
  else {
    next()
  }
}

router.use(redirectLogin)

router.get(["/", "/timeTable"], async (req, res) => {

  let timeTable;
  await new Promise((resolve, reject) => {
    util.getConnection().query(`select * from teacher_${req.session.userId}`, (err, result) => {
      timeTable = result;
      resolve(1);
    });
  });

  let lecturesCompleted = [];
  await new Promise(async (resolve, reject) => {
    //needs to be change after having data of all users
    // for(let section of userSections) {
    //   let lectures = await getTotalLectures(/*subject that taught by this teacher to this section*/, section);
    //   lecturesCompleted.push([section, lectures]);
    // }
    lecturesCompleted.push(['s10', await util.getTotalLectures('oops', 's10', req.session.department)])
    resolve(true);
  });


  //teacher Details



  // res.render("timeTable", {timeTable: timeTable});
  res.render("timeTable", {timeTable: timeTable, lecturesCompleted: lecturesCompleted})

});


const testMiddleware = (req, res) => {
  var params = req.params;
  console.log("params= ", params)
  res.send("1")
}

router.get("/attendance/:lecture/:cell", (req, res) => {


  //TODO: split last url param to store section, subject, group if cell contains lab
  var params = req.params;
  var cell = params.cell.split(' ');


  req.session.selectedSection = cell[1];
  req.session.userSubject = cell[0];
  req.session.lecture = req.params.lecture;
  
  
  if(!req.session.userSections.includes(req.session.selectedSection)) {
    return res.send("<h2>You cannot access that section</h2>");
  }

  
  util.getConnection().query(`select * from section_${req.session.selectedSection}`, (err, result) => {

    if(err || result.length === 0) {
      console.log("cannot process further");
      return
    }
    req.session.Students = result;
    res.render("attendance", {Students: req.session.Students});

    console.log(req.session.userId);

    req.session.totalStudents = result.length;

    req.session.save();
    //res.send(result);
    // console.log(req.session);
  });
});

router.post("/attendance", async (req, res) => {

  const attendStatus = req.body;
  console.log(attendStatus);

  let rollNumbers = '';
  let attendanceList = "";

  for(let i=0; i<req.session.totalStudents; i++) {
    if(attendStatus[`${req.session.Students[i].studentRollNo}`]) {
      attendanceList += "'Present', ";
    }
    else {
      attendanceList += "'Absent', ";
    }
    rollNumbers += `a${req.session.Students[i].studentRollNo}, ` ;
  }

  console.log(req.session);

  let valid_entry = await new Promise((resolve, reject) => {
    util.getConnection().query(`select SNo from section_${req.session.selectedSection}_attendance where lecture='${req.session.userSubject}_${util.getDate()}_${req.session.lecture}'`, (err, result) => {
      if(err) {
        console.log(err);
      }
      if(result.length === 1) {
        res.send(`
          attendance already taken
          <br>
          <a href='timeTable'>home</a>
          `);
          resolve(0)
      }
      else {
        resolve(1)
      }
    })
  })

  if(!valid_entry) return;

  let sql = `insert into section_${req.session.selectedSection}_attendance (lecture, lecture_date, lecture_no, userID, ${rollNumbers.substring(0, rollNumbers.length-2)}) values('${req.session.userSubject}', '${dateFns.format(new Date(), 'yyyy:MM:dd')}', '${Number(req.session.lecture[3])}', '${req.session.userId}', ${attendanceList.substring(0, attendanceList.length-2)})`;
  console.log(sql);

  util.getConnection().query(sql); 

  res.send(`${req.body}
    return to <a href='/teacher/timeTable'>Home</a>`);                         //needs to be change

  // let total_lectures = await util.getTotalLectures(req.session.userSubject, req.session.selectedSection, req.session.department);
  let sql2 = `update department_${req.session.department} set total_lectures=total_lectures+1 where Teacher_id='${req.session.userId}' and section='${req.session.selectedSection}' and subject='${req.session.userSubject}'`;
  console.log(sql2);
  util.getConnection().query(sql2);
});



router.get("/:section", sectionAccessibility, async (req, res) => {

  var {section} = req.params;

  var subject = await db.getSubjects(req.session.department, req.session.userId, section)

  console.log(req.session.department, req.session.userId, section, subject);

  var sectionAttendance = await db.getSectionDetails(section, subject.subject);

  if(Array.isArray(sectionAttendance) && sectionAttendance[0] === -1) {
    res.send(`Error: ${sectionAttendance[1]}`)
  } else if(sectionAttendance === 0) {
    res.send('No attendance taken for this lecture')
  } else {

    var arr = [];
    arr.push(['Roll No', 'Attendance', 'Percentage'])

    var keys = Object.keys(sectionAttendance[0])

    keys.splice(1,3)


    for(let i=0; i<sectionAttendance.length; i++) {
      arr[0].push(sectionAttendance[i].lecture)
    }


    for(let j=1; j<keys.length; j++) {

      let tempArr = [];
      tempArr[0] = keys[j];

      for(let i=0; i<sectionAttendance.length; i++) {
        tempArr[i+1] = sectionAttendance[i][keys[j]]
      }

      arr.push(tempArr)
    }

    var totalLectures = await util.getTotalLectures(subject.subject, section, req.session.department)

    for(let i=1; i<arr.length; i++) {

      let attend = 0;
      for(let j=1; j<arr[i].length; j++) {
        if(arr[i][j] === 'Present') {
          attend++;
        }
      }

      arr[i].splice(1, 0, attend)
      arr[i].splice(2, 0, Number.parseFloat((attend*100)/totalLectures).toPrecision(4))

    }

    res.send(arr)
  }

})

module.exports = router;
