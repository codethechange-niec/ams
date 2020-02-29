
const util = require(__dirname + '/../functions.js')

var dbConnection = util.getConnection();

module.exports.getSectionDetails = (section, subject, grp) => {

  if(!grp)grp='Both';

  return new Promise((resolve, reject) => {
    dbConnection.query(`select * from section_${section}_attendance where lecture='${subject}' and grp='${grp}'`, (err, result) => {
      if(err) {
        console.log(err);
        resolve([-1, err.code])
      }
      else {
        if(result.length === 0) {
          resolve(0)
        } else {
          resolve(result)
        }
      }
    })
  })
}


module.exports.getSubjects = (department, id, section="") => {

  return new Promise((resolve, reject) => {
    dbConnection.query(`select subject from department_${department} where Teacher_id='${id}' ${section?`and section='${section}'`:''}`, (err, result) => {
      if(err) {
        console.log(err);
        resolve([-1, err.code])
      }
      else {
        if(result.length === 0) {
          resolve(0)
        } else {
          resolve(result)
        }
      }
    })
  })
}

// module.exports.
