const { cn } = require("../config/connection");
const inquirer = require("inquirer");

const add_an_employee = async () => {
  let roles = [];
  let sql1 = `SELECT * FROM role`;
  cn.query(sql1, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    results.map((element) => {
      roles.push(`ID - ${element.id}, Title - ${element.title}`);
    });
  });

  let manager = [];
  let sql2 = `SELECT * FROM employee`;
  cn.query(sql2, (err, results) => {
    if (results.length > 0) {
      results.map((element,index,row) => {

        if (index + 1 === row.length) {
          manager.push(`ID - ${element.id}, Name - ${element.first_name}`)
          manager.push('Not Required')
        } else {
          manager.push(`ID - ${element.id}, Name - ${element.first_name}`)
        }


      

      });
    } else {
      const err = "No Manager is ro select";
      manager.push(err);
    }
  });

  const answer = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is your first_name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is your last_name?",
    },
    {
      name: "role_id",
      type: "list",
      choices: roles,
      filter: (name) => {
        let dep = name.trim();
        let pattern = /[0-9]+/g;
        let matches = dep.match(pattern);
        let value = matches[0];
        return value;
      },
      message: "choose roles from the list?",
    },

    {
      name: "manager_id",
      type: "list",
      choices: manager,
      filter: (name) => {
        if (manager[0] !== 'No Manager is ro select') {
          let dep = name.trim();
          let pattern = /[0-9]+/g;
          let matches = dep.match(pattern);
          let value = matches[0];
          return value;
        }
        return null;
      },
      message: "choose Manger from the list?",
    },
  ]);

  console.log(answer);

  let sql3 = `INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES (?,?,?,?)`;
  const params = [
    answer.first_name,
    answer.last_name,
    answer.role_id,
    answer.manager_id,
  ];
  return new Promise(function (resolve, reject) {
    cn.query(sql3, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { add_an_employee };
