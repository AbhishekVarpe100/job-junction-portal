const express=require('express')
const router=express.Router();
const connection=require('../Connection')


//get photo
router.get('/getphoto',(req,res)=>{
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


  //get employee info
router.get('/getinfo',(req,res)=>{
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

  //get all jobs
router.get('/getjobs',(req,res)=>{
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


  module.exports=router;