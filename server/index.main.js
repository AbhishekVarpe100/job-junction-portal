const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const fs=require('fs');
const app = express();
// app.use(bodyParser.json());



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cors());
app.use(express.json());

const multer = require("multer");
const path = require("path");
app.use(express.static("Public"));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "",
  database: "elearn",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

//sign up
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  var hashPassword = await bcrypt.hash(password, 5);

  connection.query(
    "select * from register where email=?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length == 0) {
        connection.query(
          "insert into register(name,email,password) values(?,?,?)",
          [name, email, hashPassword],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.json("success");
            }
          }
        );
      } else {
        res.json("present");
      }
    }
  );
});

//Login  //

app.post("/login", (req, res) => {
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
          res.json("user_not_found");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(2000, () => {
  console.log("Server is live on port 2000");
});

// creating a storage for the profile image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});




app.post("/upload", upload.single("file"), (req, res) => {
  const filename = req.file.filename;
  const username = req.body.name;
  const password = req.body.password;
  // console.log(filename,username,password);

  try {
    connection.query(
      "insert into profilephoto(username,password,photo) values(?,?,?)",
      [username, password, filename],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send("uploaded");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});


// edit photo
app.put("/editphoto", upload.single("file"), (req, res) => {
  const filename = req.file.filename;
  const username = req.body.name;
  const password = req.body.password;
  // console.log(filename,username,password);

  try {

    connection.query('select photo from profilephoto where username=? and password=?',[username,password],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        // fs.unlinkSync(`./Public/Images/${result[0].photo}`)
        fs.unlink(`./Public/Images/${result[0].photo}`,(err,result)=>{
          if(err){
            console.log(err);
          }
          else{

            connection.query(
              "update profilephoto set photo=? where username=? and password=?",
              [filename,username, password],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).send("uploaded");
                }
              }
            );
            
          }
        })
      }
    })

  } catch (error) {
    console.log(error);
  }
});


app.post("/createprofile", (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    designation,
    skills,
    experience,
  } = req.body;

  try {
    connection.query(
      "insert into profile(username,password,firstname,lastname,desig,skills,exp) values(?,?,?,?,?,?,?)",
      [
        username,
        password,
        firstName,
        lastName,
        designation,
        skills,
        experience,
      ],
      (err, result) => {
        if (err) {
          res.status(500).send("Internal server error");
        } else {
          res.status(200).send("added");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});


//get photo

app.get('/getphoto',(req,res)=>{
  const {username,password}=req.query;
  console.log(username)
  try {
    connection.query('select photo from profilephoto where username=? and password=?',[username,password],(err,result)=>{
      if(err){
        console.log(err);
      }
      else if(result.length>0){
        console.log(result[0].photo);
        res.json(result[0].photo)
      }
    })


    
  } catch (error) {
    console.log(error);
  }
  
})

//delete photo

app.delete('/deletephoto',(req,res)=>{
  const {name,password}=req.body;
  console.log(name,password);

  try{

    connection.query('select photo from profilephoto where username=? and password=?',[name,password],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        // fs.unlinkSync(`./Public/Images/${result[0].photo}`)
        fs.unlink(`./Public/Images/${result[0].photo}`,(err,result)=>{
          if(err){
            console.log(err);
          }
          else{

            connection.query('delete from profilephoto where username=? and password=?',[name,password],(err,result)=>{

              res.json('success');
            })
            
          }
        })
      }
    })

  }
  catch(err){
    console.log(err);
  }
})




//get employee info
app.get('/getinfo',(req,res)=>{
  const {username,password}=req.query;
  console.log(username,password);

  try {
    connection.query('select * from profile where username=? and password=?',[username,password],(err,result)=>{
      if(err){
        console.log(err);
      }
      else if(result.length>0){
        res.json(result[0]);
      }
    })
    
  } catch (error) {
    console.log(error);
  }
  
})

//delete information
app.delete('/deleteinfo/:id',(req,res)=>{
  const id=req.params.id;
  connection.query('delete from profile where id=?',[id],(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json("Deleted");
    }
  })
})


app.put('/editinfo/:id',(req,res)=>{
  const id=req.params.id;

  const {firstName,lastName,designation,skills,experience}=req.body;
  const query='update profile set firstname=?, lastname=?, desig=?, skills=?, exp=? where id=?';

  try {
    connection.query(query,[firstName,lastName,designation,skills,experience,id],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json('edited')
      }
    })
  } catch (error) {
    console.log(error)
  }
  // console.log(firstName,lastName,designation,skills,experience);
})



app.post('/createjob',(req,res)=>{
  let {
    username,
    password,
    jobTitle,
    companyName,
    jobLocation,
    education,
    salary,
    benefits,
    deadline,
    phoneNumber,
    email,
    jobDescription,
    skillsRequired,
    jobType,
    jobCategory,
  }=req.body;
  

  console.log(username,password)
  try{
    let query='insert into createjob(jobtitle,companyname,joblocation,education,salary,benefits,      deadline,phone,email,jobdesc,skills,type,category,username,password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    connection.query(query,[jobTitle,
      companyName,
      jobLocation,
      education,
      salary,
      benefits, 
      deadline,
      phoneNumber,
      email,
      jobDescription,
      skillsRequired,
      jobType,
      jobCategory,
      username,
      password],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json('created');
      }
    })
  }

  catch(err){
    console.log(err);
  }

})


//get all jobs

app.get('/getjobs',(req,res)=>{
  try {
    connection.query('select * from createjob',(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        // console.log(result.jobdesc)
        res.json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
})


app.delete('/deletejob/:id',(req,res)=>{
  const id=req.params.id;
  try {
    connection.query('delete from createjob where id=?',[id],(err,rresult)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json('deleted')
      }
    })
  } catch (error) {
    console.log(error);
  }
})
