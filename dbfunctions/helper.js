const mysql = require('mysql')


// function dbConnection(host, user, password, database) {
  
//   return mysql.createConnection({
//     host: host || process.env.DB_HOST,
//     user: user || process.env.DB_USER,
//     password: password || process.env.DB_PASSWORD,
//     database: database || process.env.DATABASE
//   })  

// }

// var host, user, password, database = '';


var db;  


function queryProcessSchemaGet(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) =>{
      if(err) {
        console.log(err);
        resolve(-1)
      }
      // else if(result.length == 0) {
      //   resolve(0);
      // }
      else resolve(result);
    })
  })
}

function queryProcessSchemaPut(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) =>{
      if(err) {
        console.log(err);
        resolve(-1)
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


module.exports.dbConnection = dbConnection;
module.exports.queryProcessSchemaGet = queryProcessSchemaGet;
module.exports.queryProcessSchemaPut = queryProcessSchemaPut;
module.exports.ObjToString = ObjToString;
module.exports.setDatabaseConnectionParamaters = (host_, user_, password_, database_) => {
  db = mysql.createConnection({
    host: host_,
    user: user_,
    password: password_,
    database: database_
  })
}


