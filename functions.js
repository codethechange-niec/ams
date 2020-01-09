//jshint esversion:6

const mysql = require("mysql")

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
    let sql = `select count(a${rollNo}) from section_${section}_attendance where lecture='${subject}' and a${rollNo}='Present'`;
    console.log(sql);
    const database = mysql.createConnection({
      host : "localhost",
      user : "ODBC",
      password : "",
      database : "college"
    });
    database.query(sql, (err, result) => {
      if(err) resolve("Invalid")
      let presentDays = result[0][`count(a${rollNo})`];
      console.log(presentDays);
      resolve(presentDays);
    })
  })
}

exports.getTotalLectures = function getTotalLectures(subject, section, department) {

  return new Promise((resolve, reject) => {
    const database = mysql.createConnection({
      host : "localhost",
      user : "ODBC",
      password : "",
      database : "college"
    });
    database.query(`select total_lectures from department_${department} where Subject='${subject}' and Section='${section}'`, (err, result) => {
      if(err) {console.log(err); reject("sql error")}
      console.log(result);
      if(result.length)
      {
        let totalLectures = result[0].total_lectures;
        //console.log(totalLectures);
        resolve(totalLectures);
      }
    });
  })
}

exports.getConnection = () => {return mysql.createConnection({
    host : "localhost",
    user : "ODBC",
    password : "",
    database : "college"
})}
//console.log(getdate());
