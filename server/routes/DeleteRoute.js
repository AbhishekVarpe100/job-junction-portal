const express=require('express')
const router=express.Router();
const connection=require('../Connection');
const fs=require('fs');
const { runInNewContext } = require('vm');



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


  //delete applicant
  router.delete('/deleteapplicant',(req,res)=>{
    const {id,username,pass,skills,title}=req.query;
    try {

      connection.query('update apply set status=false where applicant=? and appli_password=? and jobtitle=?',[username,pass,title],(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          connection.query('delete from applicants where id=?',[id],(err,rresult)=>{
            if(err){
              console.log(err);
            }
            else{
              res.json('deleted')
              
            }
          })

        }
      })

      
    } catch (error) {
      console.log(error);
    }
  })



  //delete apply
  router.delete('/deleteapply',(req,res)=>{
    const {id}=req.query;
    try {
      connection.query('delete from apply where id=?',[id],(err,rresult)=>{
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


  //hire employee
  router.delete('/hire',(req,res)=>{
    const {id,username,pass,skills,title}=req.query;
    try {

      connection.query('update apply set status=true where applicant=? and appli_password=? and jobtitle=?',[username,pass,title],(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          connection.query('delete from applicants where id=?',[id],(err,rresult)=>{
            if(err){
              console.log(err);
            }
            else{
              res.json('deleted')
              
            }
          })

        }
      })

      
    } catch (error) {
      console.log(error);
    }
  })

//delete article
  router.delete('/deletearticle/:id',(req,res)=>{
    const id=req.params.id
    try {

      connection.query('select image from article where id=?',[id],(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          fs.unlink(`Public/Articles/${result[0].image}`,(err)=>{
            if(err){
              console.log(err);
            }
            else{
              connection.query('delete from article where id=?',[id],(err,rresult)=>{
                if(err){
                  console.log(err);
                }
                else{
                  res.json('deleted')
                }
              })
            }
          })
         
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  })


//delete resume
  router.delete('/deleteresume',async(req,res)=>{
    const {id,photo}=req.query;
   await fs.unlink(`Public/Resume/${photo}`,(err)=>{
    // console.log(err)
   })
    await connection.query('delete from resume where id=?',[id],(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.json("deleted")
      }
    })
  })

  module.exports=router;