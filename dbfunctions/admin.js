//for all admin db functions 

const util = require('./helper')

util.setDatabaseConnectionParamaters(
  process.env.DB_HOST||'localhost',
  process.env.DB_USER_ID||'ODBC',
  process.env.DB_USER_PASSWORD||'',
  process.env.DB_DATABASE||'college'
)


//create user in users table
module.exports.createUser = async (details) => {
  return await util.queryProcessSchemaPut(`insert into users values('${details.id}', '${details.name}', '${details.password}', '${details.type}', '${details.department}')`)
}


//push entry in department table which subject is teaching to which section
module.exports.assignClass = async (details) => {
  return await util.queryProcessSchemaPut(`insert into department_${details.department} values('${details.id}', '${details.section}', '${details.subject}', 0)`)
}


//create section table with rollnumber and group
module.exports.createSectionTable = async (sectionName) => {
  return await util.queryProcessSchemaPut(`create table section_${sectionName} (
    studentRollNo varchar(12),
    studentName varchar(20),
    grp enum("A", "B")
  )`)
}


//create attendance table for a section
module.exports.createAttendanceSection = async (details) => {

  var studentString = ""
  for(let student of details.students) {
    studentString += `a${student} varchar(10),`
  }

  return await util.queryProcessSchemaPut(`create table section_${details.section}_attendance (
    Sno int primary key auto_increment,
    lecture varchar(40) not null,
    lecture_date date not null,
    lecture_no varchar(10) not null,
    ${studentString.substr(0, studentString.length-1)}
  )`)
}