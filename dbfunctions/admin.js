//for all admin db functions

const util = require('./helper')

// util.setDatabaseConnectionParamaters(
//   process.env.DB_HOST || 'localhost',
//   process.env.DB_USER_ID || 'root',
//   process.env.DB_USER_PASSWORD || 'Root@987',
//   process.env.DB_DATABASE || 'ams'
// )


//create user in users table
module.exports.createUser = async (details) => {
  return await util.queryProcessSchemaPut(`insert into users values('${details.id}', '${details.name}', '${details.password}', '${details.type}', '${details.department}')`)
}


//delete user from table
module.exports.deleteUser = async (id) => {
	return await util.queryProcessSchemaPut(`delete from users where userID='${id}'`);
}


//get details of a teacher
module.exports.getDetails = async (id, department, password=0) => {
	return await util.queryProcessSchemaGet(`select userID, Name, department ${password?", password":""} from users where userType='Teacher' and department='${department}' and userID='${id}'`);
}


//create teacher timetable
module.exports.createTimeTable = async (id) => {
	return await util.queryProcessSchemaPut(`create table teacher_${id} (day_no int primary key auto_increment, lec1 varchar(20), lec2 varchar(20), lec3 varchar(20), lec4 varchar(20), lec5 varchar(20), lec6 varchar(20), lec7 varchar(20))`);
}


//delete teacher timeTable
module.exports.deleteTimeTable = async (id) => {
	return await util.queryProcessSchemaPut(`drop table teacher_${id}`);
}


//filling teacher's time table
module.exports.fillTimeTable = async (id, obj) => {
	var insert = `insert into teacher_${id} (lec1, lec2, lec3, lec4, lec5, lec6, lec7) values `;

	for(let i=1; i<=5; i++) {

		var value = "(";

		for(let j=1; j<=7; j++) {

			let input = obj[`${i}${j}`];

			if(input == '') input = '-';

			value += `'${input}'` + ', '
		}

		value = value.substr(0, value.length - 2) + ')';

		console.log(value);

		insert += value + ', ';

	}

	return await util.queryProcessSchemaPut(insert.substr(0, insert.length - 2));

}


//get timetable of a teacher
module.exports.getTimeTable = async (id) => {
	return await util.queryProcessSchemaGet(`select * from teacher_${id}`);
}


//push entry in department table which subject is teaching to which section
module.exports.assignClass = async (details) => {
  return await util.queryProcessSchemaPut(`insert into department_${details.department.toLowerCase()} values('${details.id}', '${details.section}', '${details.subject}', 0)`)
}


//delete entries in department table of a teacher
module.exports.unassignClass = async (id, department) => {
	return await util.queryProcessSchemaPut(`delete from department_${department} where teacher_id='${id}'`);
}


//show assigned sections with respected subjects
module.exports.getAssignDetails = async (id, department) => {
	return await util.queryProcessSchemaGet(`select section, subject, total_lectures from department_${department} where teacher_id='${id}'`)
}


//create section table with rollnumber and group
module.exports.createSectionTable = async (sectionName) => {
  return await util.queryProcessSchemaPut(`create table section_${sectionName} (
    studentRollNo varchar(12),
    studentName varchar(40)
  )`)
}


//fill section table with students
module.exports.fillSection = async (details) => {

	var valueString = "";
	for(let student of details.students) {
		valueString += `('${student.rollNo}', '${student.name}'), `;
	}

	return await util.queryProcessSchemaPut(`insert into section_${details.sectionName} values` + valueString.substr(0, valueString.length-2));

}


//get students list
module.exports.getSection = async (sectionName) => {
	return await util.queryProcessSchemaGet(`select * from section_${sectionName}`);
}


//delete section table
module.exports.deleteSection = async (sectionName) => {
	return await util.queryProcessSchemaPut(`drop table section_${sectionName}`);
}


//delete section attendance table
module.exports.deleteSectionAttendance = async (sectionName) => {
	return await util.queryProcessSchemaPut(`drop table section_${sectionName}_attendance`);
}


//create attendance table for a section
module.exports.createSectionAttendanceTable = async (details) => {

	var query = "";

  for(let student of details.students) {
    query += `${student.rollNo} varchar(10),`
  }

  return await util.queryProcessSchemaPut(`create table section_${details.sectionName}_attendance (
    Sno int primary key auto_increment,
		lecture varchar(40) not null,
		grp enum("A", "B", "Both"),
    lecture_date date not null,
		lecture_no int not null,
		userId varchar(20) not null,
    ${query.substr(0, query.length-1)}
  )`)
}