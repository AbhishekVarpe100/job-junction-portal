const express=require('express')
const router=express.Router();
const multer = require("multer");
const path = require("path");
const fs=require('fs')

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



  //edit photo 
  // edit photo
router.put("/editphoto", upload.single("file"), (req, res) => {
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


  //update profile

  router.put('/editinfo/:id',(req,res)=>{
    const id=req.params.id;
  
    const {firstName,lastName,designation,skills,experience}=req.body;
    const query='update profile set firstname=?, lastname=?, desig=?, skill=?, exp=? where id=?';
  
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




  // save changes
  router.put('/savechanges',(req,res)=>{
    const {id,background,textColor}=req.body;
    // console.log(id,background,textColor)
    connection.query('update resume set background=? , text_color=?,color1=null , color2=null, g_text_color=null, alignment=null where id=?',[background,textColor,id],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json("set")
      }
    })
  })



  // save changes2 pattern2
  router.put('/savechanges2',(req,res)=>{
    const {id,g_color1,g_color2,g_TextColor,alignment}=req.body;
    // console.log(id,g_color1,g_color2,g_TextColor,alignment);
    connection.query(`update resume set background='#ffffff',text_color='#000000', color1=? , color2=?, g_text_color=?, alignment=? where id=?`,[g_color1,g_color2,g_TextColor,alignment,id],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json("set")
      }
    })
  })



  // reset changes
  router.put('/resetchanges',(req,res)=>{
    const {id}=req.body;
    connection.query("update resume set background='#ffffff' , text_color='#000000',color1=null , color2=null, g_text_color=null, alignment=null where id=?",[id],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json("set")
      }
    })
  })
  


  module.exports=router;
  