const { cn } = require("../config/connection");
const inquirer = require("inquirer");

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
  return new Promise(function (resolve, reject) {
    cn.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { add_department };
