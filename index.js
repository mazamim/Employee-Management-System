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
console.log(answer)
};



module.exports = { add_department };
