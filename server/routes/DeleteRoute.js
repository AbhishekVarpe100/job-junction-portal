const express=require('express')
const router=express.Router();
const connection=require('../Connection');
const fs=require('fs')



//delete photo
router.delete('/deletephoto',(req,res)=>{
    const {name,password}=req.body;
    console.log(name,password);
  
    try{
  
      connection.query('select photo from profilephoto where username=? and password=?',[name,password],(err,result)=>{
        if(err){
          console.log(err);
        }
        else{
          // fs.unlinkSync(`./Public/Images/${result[0].photo}`)
          fs.unlink(`Public/Images/${result[0].photo}`,(err,result)=>{
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




  //delete information
router.delete('/deleteinfo/:id',(req,res)=>{
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



  router.delete('/deletejob/:id',(req,res)=>{
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

  module.exports=router;