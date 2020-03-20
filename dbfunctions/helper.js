const mysql = require('mysql')


var db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE
});



function queryProcessSchemaGet(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) =>{
      if(err) {
        console.log(err);
        resolve({status: -1, errror: err})
      }
      else if(result.length == 0) {
        resolve({status: 0});
      }
      else resolve({status: 1, result: result});
    })
  })
}

function queryProcessSchemaPut(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) =>{
      if(err) {
        console.log(err);
        resolve({status: -1, error: err})
      }
      else resolve({status: 1, result: result});
    })
  })
}

function ObjToString(object) {

  var string = "";

  for(let i in object) {
    string += `'${object[i]}'` + ', '
  }

  return string.slice(0, string.length-2);

}


// module.exports.dbConnection = db;
module.exports.queryProcessSchemaGet = queryProcessSchemaGet;
module.exports.queryProcessSchemaPut = queryProcessSchemaPut;
module.exports.ObjToString = ObjToString;

// module.exports.setDatabaseConnectionParamaters = (host_, user_, password_, database_) => {
//   db = mysql.createConnection({
//     host: host_,
//     user: user_,
//     password: password_,
//     database: database_
//   })
// }
