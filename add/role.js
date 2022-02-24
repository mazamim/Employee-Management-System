const { cn } = require("../config/connection");
const inquirer = require("inquirer");

const add_role = async () => {
    let choices=[]
    const sql = `SELECT * FROM department`;
  cn.query(sql,(err, results)=>{
    if (err) {
      console.log(err);
      return;
    }
  results.map((element
    )=>{
    choices.push(`ID - ${element.id}, Department - ${element.name}`)
  })
  
  })
   
  
    const answer = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of your role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?",
      },
      {
        name: "department_id",
        type: "list",
        choices:choices,
        filter:(name)=>{
         let dep= name.trim()
         let pattern=/[0-9]+/g;
         let matches=dep.match(pattern)
         let value=matches[0]
         return value
        },
        message: "choose department id from the list?",
      },
    ]);
  
    const sql2 = `INSERT INTO role (title,salary,department_id)
    VALUES (?,?,?)`;
    const params = [answer.title,answer.salary,answer.department_id];
  
    return new Promise(function (resolve, reject) {
    cn.query(sql2, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
  
     
    });
  });
    
  }

  module.exports={add_role}