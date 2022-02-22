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
      view_table("department");
      break;

    case "view all roles":
      view_table("department");
      break;

    case "view all employee":
      view_table("department");
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

const view_table = (table) => {
  const sql = `SELECT * FROM ${table}`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(rows);
    setTimeout(() => {
      init();
    }, 2000);
  });
};

const add_an_employee = () => {
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

  currentDepartment_id = Math.floor(Math.random() * 1000);
  const sql = `INSERT INTO department (id,name)
  VALUES (?,?)`;
  const params = [currentDepartment_id, answer.department];

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
results.map((element)=>{
  choices.push(element.id)
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
      message: "choose department id from the list?",
    },
  ]);
  const sql2 = `INSERT INTO role (title,salary,department_id)
  VALUES (?,?,?)`;
  const params = [answer.title,answer.salary,192];

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
