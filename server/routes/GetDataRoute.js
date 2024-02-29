const express=require('express')
const router=express.Router();
const connection=require('../Connection')


//get photo
router.get('/getphoto',(req,res)=>{
    const {username,password}=req.query;
    // console.log("Hello")
    try {
      connection.query('select photo from profilephoto where username=? and password=?',[username,password],(err,result)=>{
        if(err){
          console.log(err);
        }
        else if(result.length>0){
          // console.log(result[0].photo);
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
    // console.log(username,password);
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



  router.get('/getinfoemp',(req,res)=>{
    const {username,password}=req.query;
    // console.log(username,password);
    try {
      connection.query('select firstname, lastname, desig, skill, exp from profile where username=? and password=?',[username,password],(err,result)=>{
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
  const id=req.params.id;
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


  //get job info
router.get('/getjobinfo/:id',(req,res)=>{
  const id=req.params.id;
    try {
      connection.query('select * from createjob where id =?',[id],(err,result)=>{
        if(err){
          console.log(err);
        }
        else{
          // console.log(result[0].email)
          res.json(result[0])
        }
      })
    } catch (error) {
      console.log(error);
    }
  })

  //get applicants
router.get('/getapplicants',(req,res)=>{
  const {username,password}=req.query;
    try {
      connection.query('select * from applicants where owner =? and password=?',[username,password],(err,result)=>{
        if(err){
          console.log(err);
        }
        else{
          // console.log(result[0].email)
          res.json(result)
        }
      })
    } catch (error) {
      console.log(error);
    }
  })

  //get applied jobs
router.get('/appliedjobs',(req,res)=>{
  const {username,password}=req.query;
    try {
      connection.query('select * from apply where applicant =? and appli_password=?',[username,password],(err,result)=>{
        if(err){
          console.log(err);
        }
        else{
          // console.log(result[0].email)
          res.json(result)
        }
      })
    } catch (error) {
      console.log(error);
    }
  })


  router.get('/sortby',(req,res)=>{
    const {sel:value}=req.query;
    
    if(value=='jobtitle'){

      connection.query('select * from createjob order by jobtitle',(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          res.json(result)
          
  
        }
      })
    }
    else if(value=='category'){
      connection.query('select * from createjob order by category',(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          res.json(result)
         
  
        }
      })
      
    }
    else if(value=='salary'){
      connection.query('select * from createjob order by salary',(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          res.json(result)
  
        }
      })

    }
  
  })


  router.get('/getarticles',(req,res)=>{

    connection.query('select * from article',(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.json(result)
      }
    })

  })


  router.get('/getlikes',(req,res)=>{
    const {username,password}=req.query;
    connection.query('select * from likes where username=? and password=?',[username,password],(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.json(result)
        // console.log(result)
      }
    })
  })


 

  router.get('/totallike', (req, res) => {
    const {title } = req.query;
    connection.query('SELECT COUNT(*) AS totalLikes FROM likes WHERE title=?', [title], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Assuming your result is an array of objects with the totalLikes property
            const totalLikes = result[0].totalLikes || 0; // Default to 0 if no likes found
            res.json({ totalLikes });
        }
    });
});


router.get('/getresume',(req,res)=>{
  const {user,password}=req.query;
  try{
    connection.query('select * from resume where username=? and password=?',[user,password],(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.json(result[0])
      }
    })
  }
  catch(err){
    console.log(err)
  }
})

  

  module.exports=router;