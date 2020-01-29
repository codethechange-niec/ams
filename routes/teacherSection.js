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

    util.getConnection().query(`select section, subject, total_lectures from department_it where teacher_id='${req.session.userId}' order by section asc`, (err, result) => {
      if(err) {
        console.log(err);
        res.send("Something went wrong");
      } else if(result.length ==0) {
        res.send("No records available")
      } else {

        for(let i=0; i<result.length; i++) {

          lecturesCompleted.push([result[i].section, result[i].subject, result[i].total_lectures]);
        }

        res.render("timeTable", {timeTable: timeTable, lecturesCompleted: lecturesCompleted})

      }
    })

    // //needs to be change after having data of all users
    // for(let section of req.session.userSections) {


    //   var subjects = await db.getSubjects(req.session.department, req.session.userId, section);


    //   console.log("subjects ", subjects);


    //   for(let j=0; j<subjects.length; j++) {

    //     let lectures = await util.getTotalLectures(subjects[j].subject, section, req.session.department);

    //     console.log([section + subjects[j].subject, lectures]);

    //     lecturesCompleted.push([section +" "+ subjects[j].subject, lectures]);

    //   }

    //   // let lectures = await getTotalLectures(/*subject that taught by this teacher to this section*/, section);
    //   // lecturesCompleted.push([section, lectures]);
    // }
    // lecturesCompleted.push(['s10', await util.getTotalLectures('oops', 's10', req.session.department)])
    resolve(true);
  });


  //teacher Details

  // const ejs = require('ejs')
  // console.log(ejs.render("timeTable", {timeTable: timeTable, lecturesCompleted: lecturesCompleted}));



  // res.render("timeTable", {timeTable: timeTable});

});


const testMiddleware = (req, res) => {
  var params = req.params;
  console.log("params= ", params)
  res.send("1")
}

router.get("/attendance/:lecture/:cell", (req, res) => {


  //TODO: split last url param to store section, subject, group if cell contains lab
  var params = req.params;

  //splitting the cell into section, subject, lab(if exist), lab grp(if lab exists)
  var cell = params.cell.split(' ');
  req.session.selectedSection = cell[1].toLowerCase();
  req.session.userSubject = cell[0];
  req.session.userClassGrp = '';
  if(cell.length >= 4) {
    req.session.userSubject += " LAB";
    req.session.userClassGrp = cell[2];
  }


  req.session.lecture = req.params.lecture;


  if(!req.session.userSections.includes(req.session.selectedSection)) {
    return res.send("<h2>You cannot access that section</h2>");
  }


  var sqlGrpString = req.session.userClassGrp?` where grp='${req.session.userClassGrp}'`:'';
  // console.log("sqlgrpstring", sqlGrpString);

  util.getConnection().query(`select * from section_${req.session.selectedSection}` + sqlGrpString, (err, result) => {

    if(err) {
      console.log(err)
      return console.log("cannot process further");
    } else if(result.length === 0) {
      console.log("NO students");
      res.send("No students available");
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

  util.getConnection().query(sql);

  res.send(`${req.body}
    return to <a href='/teacher/timeTable'>Home</a>`);                         //needs to be change

  // let total_lectures = await util.getTotalLectures(req.session.userSubject, req.session.selectedSection, req.session.department);

  let sql2 = `update department_${req.session.department} set total_lectures=total_lectures+1 where Teacher_id='${req.session.userId}' and section='${req.session.selectedSection} ${req.session.userClassGrp}' and subject='${req.session.userSubject}'`;

  util.getConnection().query(sql2);
});


router.get("/:section/:subject", sectionAccessibility, async (req, res) => {

  var param1 = req.params.section.split(" ");

  var section = param1[0];

  var grp = "";
  if(param1.length == 2) {
    grp = param1[1];
  }

  var subject = [{subject: req.params.subject}];


  // var subject = await db.getSubjects(req.session.department, req.session.userId, section)

  console.log(req.session.department, req.session.userId, section, subject);

  var sectionAttendance = await db.getSectionDetails(section, subject[0].subject);

  console.log("section details:", sectionAttendance);

  if(Array.isArray(sectionAttendance) && sectionAttendance[0] === -1) {
    res.send(`Error: ${sectionAttendance[1]}`)
  } else if(sectionAttendance === 0) {
    res.send('No attendance taken for this lecture')
  } else {

    var arr = [];
    arr.push(['Roll No', 'Attendance', 'Percentage'])

    var keys = Object.keys(sectionAttendance[0])

    //filterout only rollnumber keys
    keys.splice(0,6)

    //filling all lecture dates
    for(let i=0; i<sectionAttendance.length; i++) {
      arr[0].push(dateFns.format(sectionAttendance[i].lecture_date, 'dd-MM-yyyy'))
    }

    //filling table rows with data
    for(let j=0; j<keys.length; j++) {

      let tempArr = [];

      //inserting rollnumbers
      tempArr[0] = keys[j].substring(1, keys[j].length);

      //inserting present and absent states to roll numbers
      for(let i=0; i<sectionAttendance.length; i++) {
        tempArr[i+1] = sectionAttendance[i][keys[j]]
      }

      arr.push(tempArr)
    }

    var totalLectures = await util.getTotalLectures(subject[0].subject, section, req.session.department)

    if(gpr) {
      var section;
    }


    //calculating total days attended
    for(let i=1; i<arr.length; i++) {

      let attend = 0;
      for(let j=1; j<arr[i].length; j++) {

        // if(arr[i])
        if(arr[i][j] === 'Present') {
          attend++;
        }
      }

      //inserting attended days
      arr[i].splice(1, 0, attend)

      //calculating and inserting percentage
      arr[i].splice(2, 0, Number.parseFloat((attend*100)/totalLectures).toPrecision(4))

    }


    console.log("Array:", arr);
    res.render("sectionDetails", {
      section: "section: " + section,
      arr: arr
    })
  }

})

module.exports = router;
