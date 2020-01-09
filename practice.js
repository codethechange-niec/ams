// var x = require('./dbfunctions/helper')

var obj = {
  name: "Mohit",
  age: 19,
  branch: "it",
  course: "btech",
  year: 3
}

// for(let key in obj) {
//   console.log(key)
// }

// console.log('string'.substring(0, 3))

var details = {
  students: ['a', 'b', 'c']
}

var studentString = ""
for(let student of details.students) {
  studentString += `a${student} varchar(20),`
}

console.log(`create table section_${details.section}_attendance (
  Sno int primary key auto_increment,
  lecture varchar(40) not null,
  lecture_date date not null,
  lecture_no varchar(10) not null,
  ${studentString.substr(0, studentString.length-1)}
)`)