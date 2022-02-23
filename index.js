const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: process.env.HOST,
    // MySQL username,
    user: process.env.USER,
    // MySQL password
    password: process.env.PASSWORD,
    database: process.env.DB,
  },
  console.log(`Connected to the database.`)
);

async function init() {
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

init();

const runTask = (answer) => {
  switch (answer.task) {
    case "view all departments":
      view_table(`SELECT * FROM department`);
      break;

    case "view all roles":
      view_table(`SELECT role.id, role.title, role.salary,department.name as department_Name
      FROM role
      INNER JOIN department ON department.id=role.department_id`);
      break;

    case "view all employees":
      view_table(`SELECT employee.id,employee.first_name,last_name,role.title,department.name,salary,manager_id  
      FROM employee
      JOIN role
      on role.id=employee.role_id
      JOIN department
      on department.id=role.department_id`)
      break;

    case "add an employee":
      add_an_employee();
      break;

    case "add a role":
      add_role();

      break;

    case "add department":
      add_department();

      break;

    case "update an employee role":
      update_an_employee_role();

      break;

    case "Exit":
      break;

    default:
      break;
  }
};

const view_table = (sql) => {

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

    console.table(rows);
    setTimeout(() => {
      init();
    }, 2000);
  });
};

const add_an_employee = () => {

  const sql2 = `INSERT INTO employee (first_name,last_name,role_id,manager_id)
  VALUES (?,?,?,?)`;
  const params = ['Mohammed','Mazahim',1,1];

  db.query(sql2, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("sucesss");

    init();
  });


  init();
};

const add_department = async () => {
  const answer = await inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What is the name of the department?",
    },
  ]);


  const sql = `INSERT INTO department (name)
  VALUES (?)`;
  const params = [answer.department];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("sucesss");

    init();
  });
};

const add_role = async () => {
  let choices=[]
  const sql = `SELECT * FROM department`;
db.query(sql,(err, results)=>{
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

  db.query(sql2, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("sucesss");

    init();
  });
  
};

const update_an_employee_role = () => {};

module.exports = { add_department };
