var util = require('./functions');

console.log("working");
// (async () => {
//   var resposne = checkValidEntry("s10", "DS", date="", 3);
//   console.log(resposne);
// })();

async function departmentTableEntries(department="it", id=1) {

  util.getConnection().query(`select * from teacher_${id}`, (err, result) => {
    if(err) {
      console.log(err);
    } else {

      console.log(result);

      let inputArr = [];

      for(let i=0; i<result.length; i++) {
        delete result[i].day_no;
        delete result[i].day;
        for(let prop in result[i]) {

          console.log(result[i][prop])

          if(result[i][prop] != '-') {
            let cell = result[i][prop].split(' ');
            let subject = cell[0];
            let section = cell[1];

            if(cell.length>2) {
              section += ' ' + cell[2];
              subject += ' ' + cell[3];
            }

            if(inputArr.findIndex(element => element.section==section && element.subject==subject) == -1)
              inputArr.push({section: section, subject: subject});
          }

        }
      }

      console.log(inputArr);

      for(let i=0; i<inputArr.length; i++) {

        util.getConnection().query(`insert into department_${department} values('${id}', '${inputArr[i].section}', '${inputArr[i].subject}', 0)`, (err, result) => {
          if(err) {
            console.log(err)
          } else {
            console.log("Entry:", inputArr[i], "pushed");
          }
        })
      }


    }
  })
}

departmentTableEntries()

let obj = {name:"mohit", id:1}

delete obj.name;
// console.log(obj)