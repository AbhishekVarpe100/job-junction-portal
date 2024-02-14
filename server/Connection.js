const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "",
    database: "elearn",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("Connected to MySQL database");
    }
  });
  module.exports=connection;