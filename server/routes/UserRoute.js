const express=require('express')
const router=express.Router();
const connection=require('../Connection')
const bcrypt = require("bcrypt");


//sign up
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    var hashPassword = await bcrypt.hash(password, 5);
  
    connection.query(
      "select * from register where email=?",
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json("Internal server error")
        } else if (result.length == 0) {
          connection.query(
            "insert into register(name,email,password) values(?,?,?)",
            [name, email, hashPassword],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json("success");
              }
            }
          );
        } else {
          res.json("present");
        }
      }
    );
  });


  //Login
router.post("/login", (req, res) => {
    const { name, password } = req.body;
    var hashPassword;
    try {
      connection.query(
        "select * from register where name=?",
        [name],
        (error, result) => {
          if (result.length > 0) {
            hashPassword = result[0].password;
            bcrypt.compare(password, hashPassword).then((r) => {
              if (r) {
                res.status(200).json("login");
              } else {
                res.json("failed");
              }
            });
          } else {
            res.status(404).json("user_not_found");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
  


  module.exports=router;
  