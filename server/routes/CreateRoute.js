
const express=require('express')
const router=express.Router();
const multer = require("multer");
const path = require("path");

const connection=require('../Connection')

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



  //uploading photo

router.post("/upload", upload.single("file"), (req, res) => {
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




  //create profile

  router.post("/createprofile", (req, res) => {
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
        "insert into profile(username,password,firstname,lastname,desig,skill,exp) values(?,?,?,?,?,?,?)",
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


  //create job
  router.post('/createjob',(req,res)=>{
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
  


//apply for the job
  router.post('/applytojob', (req, res) => {
   
    const {id,
      jobtitle,
      companyname,
      joblocation,
      education,
      salary,
      benefits,
      deadline,
      phone,
      email,
      jobdesc,
      skills,
      type,
      category,
      username,
      password,
      photo,
      applicant,
      appli_password,firstname,lastname,desig,skill,exp}=req.body;

      
    connection.query('insert into apply(applicant,appli_password,companyname,jobtitle,jobtype,jobcategory,joblocation,createdby,adminpassword,desig) values(?,?,?,?,?,?,?,?,?,?)',[

      applicant,appli_password,companyname,jobtitle,type,category,joblocation,username,password,desig
      
      ],(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          connection.query('insert into applicants(firstname,lastname,designation,skills,exp,username,pass,owner,password,photo,category,title) values(?,?,?,?,?,?,?,?,?,?,?,?)',[firstname,lastname,desig,skill,exp,applicant,appli_password,username,password,photo,category,jobtitle],(err,result)=>{
            if(err){{
              console.log(err)
            }}
            else{
              res.json('success')
            }
          })
        }
      })
    
  });




  // const upload2 = multer({ dest: 'Public/Articles' });

  const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Public/Articles");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload2 = multer({
    storage: storage2,
  });


  router.post('/createarticle',upload2.single('image'),(req,res)=>{
    const image=req.file.filename;
    const title=req.body.title;
    const description=req.body.description;
    const username=req.body.username;
    const password=req.body.password;
    connection.query('insert into article(username,password,title,description,image) values(?,?,?,?,?)',[username,password,title,description,image],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json('created')
      }
    })
  })

  router.post('/likes',(req,res)=>{
    const {id,username,password,title}=req.body;
    

    connection.query('select * from likes where id=? and username=? and password=? and title=?',[id,username,password,title],(err,result)=>{
      if(err){
        console.log(err)
      }
      if(result.length==0){
        connection.query('insert into likes values(?,?,?,?)',[id,username,password,title],(err,result)=>{
          if(err){
            console.log(err)
          }
          else{
            res.json('liked')
          }
        })
      }
      else if(result.length==1){
        connection.query('delete from likes where id=? and username=? and password=? and title=?',[id,username,password,title],(err,result)=>{
          if(err){
            console.log(err)
          }
          else{
            res.json('deleted')
          }
        })
      }
    })
  })



  module.exports=router;

