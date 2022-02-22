const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

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
        type: "rawlist",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a role",
          "add an employee",
          "update an employee role",
          "Exit",
        ],
        message: "What would you like to do?",
      },
    ])
    .then((answer) => {
      answer.task !== "Exit" ? runTask(answer) : console.log("bye");
    });

  return answer;
}

init();

const runTask = (answer) => {
  switch (answer.task) {
    case "view all departments":
      add_department();
      break;

    case "add a role":
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
 inquirer.prompt([
          {
            name: "department",
            type: "rawlist",
            choices: choices,
            message: "What is the name of the department?",
          },
        ]).then((answer)=>{
         
          console.log(answer)
        })
       

        });

        
     
      }

      break;

    case "Exit":
      break;

    default:
      break;
  }
};

const add_department = async () => {
  const answer = await inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What is the name of the department?",
    },
  ]);

  currentDepartment_id = uuid();
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
