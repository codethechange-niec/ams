//jshint esversion:6

const mysql = require("mysql")

 const database = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'Root@987',
	database: process.env.DATABASE || 'ams'
});

function getdate() {
  const today = new Date();
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  let date = today.toLocaleDateString("en-US", options);
  date = date.substring(0, 3) + "_" + date.substring(4, 6) + "_" + date.substring(8, 12);
  //console.log(date);
  return date;
}

exports.getDate = getdate;

exports.NumericDate = () => {

  const today = new Date();
  let date = today.getDate();
  let temp = today.getMonth()+1;
  let month = (temp)>9?temp:('0' + `${temp}`);
  let year = today.getFullYear();
  return [date, month, year].join('_');

};

exports.getDay = function() {

  const options = {weekday: "long"};
  const today = new Date();
  return today.toLocaleDateString("en-US", options);

};

exports.addElement = (arr, element) => {
  if(arr.indexOf(element) === -1) arr.push(element);
};

exports.getAttendance = function getAttendance(rollNo, section, subject) {

  return new Promise((resolve, reject) => {
    let sql = `select count(${rollNo}) from section_${section}_attendance where lecture='${subject}' and ${rollNo}='P'`;
    console.log(sql);

    database.query(sql, (err, result) => {
      if(err) resolve(err)
      else {
        let presentDays = result[0][`count(${rollNo})`];
        console.log("present days:", presentDays);
        resolve(presentDays);
      }
    })
  })
}

exports.getTotalLectures = function getTotalLectures(subject, section, department) {

  return new Promise((resolve, reject) => {

    database.query(`select total_lectures from department_${department} where Subject='${subject}' and Section='${section}'`, (err, result) => {
      if(err) {console.log(err); reject("sql error")}
      // console.log(result);
      if(result.length)
      {
        let totalLectures = result[0].total_lectures;
        console.log("Total lecture:", totalLectures);
        resolve(totalLectures);
      } else {
        resolve(0)
      }
    });
  })
}


exports.database = database;
//console.log(getdate());
