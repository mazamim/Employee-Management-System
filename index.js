const inquirer = require("inquirer");


const {view_table}=require('./view')
const {add_department}=require('./add/department.js')
const {add_an_employee}=require('./add/employee')
const {add_role}=require('./add/role.js')


const init=() =>{
  let answer = inquirer
    .prompt([
      {
        name: "task",
        type: "list",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add department",
          "add a role",
          "add an employee",
          "update an employee role",
          "Exit",
        ],
        message: "What would you like to do?",
      },
    ])
    .then((answer) => {
      answer.task !== "Exit" ? runTask(answer) : db.end();
    });

  return answer;
}

init()

const runTask = async(answer) => {
  switch (answer.task) {
    case "view all departments":
    view_table(`SELECT * FROM department`).then((res)=>{
      console.table(res)
       setTimeout(() => {
         init()
       }, 2000);
    })

    
      break;

    case "view all roles":
      view_table(`SELECT role.id, role.title, role.salary,department.name as department_Name
      FROM role
      INNER JOIN department ON department.id=role.department_id`).then((res)=>{
        console.table(res)
         setTimeout(() => {
           init()
         }, 2000);
      })
      break;

    case "view all employees":
      view_table(`SELECT employee.id,employee.first_name,last_name,role.title,department.name,salary,manager_id  
      FROM employee
      JOIN role
      on role.id=employee.role_id
      JOIN department
      on department.id=role.department_id`).then((res)=>{
        console.table(res)
         setTimeout(() => {
           init()
         }, 2000);
      })
      break;

    case "add an employee":
       add_an_employee().then(()=>{
      
        console.log(`New Employee added to the database`)
         setTimeout(() => {
           init()
         }, 2000);
      })
      break;

    case "add a role":
       add_role().then(()=>{
      
        console.log(`New Role added to the database`)
         setTimeout(() => {
           init()
         }, 2000);
      })

      break;

    case "add department":
      add_department().then(()=>{
      
        console.log(`New Department added to the database`)
         setTimeout(() => {
           init()
         }, 2000);
      })

      break;

    case "update an employee role":
      // update_an_employee_role();

      break;

    case "Exit":
      break;

    default:
      break;
  }
};

module.exports={init}







