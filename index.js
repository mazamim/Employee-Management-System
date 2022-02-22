const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

var currentDepartment_id = 0;
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
          "add a role",
          "add an employee",
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
      view_Department();
      break;

    case "view all roles":
      view_all_roles();
      break;

    case "view all employees":
      view_all_employees();
      break;

    case "add an employee":
      add_an_employee();
      break;

    case "add a role":
      add_a_role()

      break;

    case "Exit":
      break;

    default:
      break;
  }
};

const view_Department = () => {
  init();
};

const view_all_roles = () => {
  init();
};

const view_all_employees = () => {
  init();
};



const add_an_employee = () => {
  init();
};

const add_a_role=()=>{
  if (currentDepartment_id !== 0) {
    add_role(currentDepartment_id);
  } else {
    const sql = `SELECT * FROM department`;
    let choices;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log("Database not connected");
        return;
      }

      choices = rows;
      inquirer
        .prompt([
          {
            name: "department",
            type: "rawlist",
            choices: choices,
            message: "What is the name of the department?",
          },
        ])
        .then((answer) => {
          console.log(answer);
        });
    });
  }
}

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

const add_role = async (department_id) => {
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
  ]);

  const sql = `INSERT INTO role (title,salary,department_id)
  VALUES (?,?,?)`;
  const params = [answer.title, answer.salary, department_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("sucesss");
    init();
  });
};

module.exports = { add_department };
