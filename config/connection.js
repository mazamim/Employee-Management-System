const mysql = require("mysql2");
require("dotenv").config();


const cn = mysql.createConnection(
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

  module.exports={cn}