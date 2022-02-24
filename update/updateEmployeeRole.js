const { cn } = require("../config/connection");
const inquirer = require("inquirer");

const updateEmpRole=async()=>{



  const answer = await inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is employer id?",
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the role id to be changed?",
    },


  
  ]);


  const sql2 = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [answer.role_id, answer.id];

  return new Promise(function (resolve, reject) {
    cn.query(sql2, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports={updateEmpRole}