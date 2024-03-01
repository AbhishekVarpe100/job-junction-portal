import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import GradientIcon from '@mui/icons-material/Gradient';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import {Link, useAsyncError} from 'react-router-dom'

const YourResume = () => {

  const [data,setData]=useState([]);
  const [user,setUser]=useState("abhishek")
  const [password,setPassword]=useState(localStorage.getItem('password'))
  const [background,setBackground]=useState('white');
  const [textColor,setTextColor]=useState('black');
  const [renderAgain,setRenderAgain]=useState(false);
  const [rerender,setReRender]=useState(false);
  const [rerender2,setReRender2]=useState(false);
  const [pattern1,setPattern1]=useState(false);
  const [pattern2,setPattern2]=useState(false);

  const [g_color1,setColor1]=useState('white');
  const [g_color2,setColor2]=useState('white');
  const [g_TextColor,set_g_textColor]=useState('black');
  const [alignment,setAlignment]=useState('left');


  useEffect(()=>{
    axios.get('http://localhost:2000/getresume',{params:{user,password}})
    .then(res=>{
      setData(res.data);
    })
  },[renderAgain,rerender,rerender2])


  const handleDelete=(id,photo)=>{
    axios.delete(`http://localhost:2000/deleteresume`,{params:{id,photo}})

    .then(res=>{
      if(res){
        alert("Resume deleted")

        setRenderAgain(!renderAgain)

      }
    })
    .catch(err=>{
      console.log(err)
    })
  }



  

  const handleChanges=(id)=>{
    axios.put('http://localhost:2000/savechanges',{id,background,textColor})
    .then(res=>{
      if(res){
        // alert("Changes has been saved");
        setReRender(!rerender)
        
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleChanges2=(id)=>{
    axios.put('http://localhost:2000/savechanges2',{id,g_color1,g_color2,g_TextColor,alignment})
    .then(res=>{
      if(res){
        // alert("Changes has been saved");
        
        setReRender2(!rerender2);
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }


  const resetChanges=(id)=>{
    axios.put('http://localhost:2000/resetchanges',{id})
    .then(res=>{
      if(res){
        // alert("Changes has been saved");
        setReRender(!rerender)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const resetChanges2=(id)=>{
    axios.put('http://localhost:2000/resetchanges',{id})
    .then(res=>{
      if(res){
          
          setReRender2(!rerender2);
          window.location.reload(true)
      
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }


  const handlePattern1=()=>{
    setPattern1(true);
    setPattern2(false);
  }
  const handlePattern2=()=>{
    setPattern1(false);
    setPattern2(true);
  }

  return (
    <>
    {data? <div className='container' style={{marginBottom:'10cm'}}><div style={{ backgroundColor: `${data.background!=null? data.background:<></>}`, color: `${data.text_color=='#000000'?data.g_text_color: data.text_color}`,
    
    backgroundImage :`linear-gradient(to ${data.alignment}, ${data.color1}, ${data.color2})`,
    
    padding: '20px', borderRadius: '10px', border: '2px solid #ccc', width: '794px', height: '1123px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Name: {data.firstname} {data.lastname}</h2>
          <h3><EmailIcon></EmailIcon> {data.email}</h3>
          <h3><PhoneInTalkIcon></PhoneInTalkIcon> {data.phone}</h3>
          <p> <u>Profile Description:</u>  {data.profile}</p>
        </div>
        <img src={`http://localhost:2000/Resume/${data.photo}`} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
      </div>
      <hr />
      <div>
        <h2>Education</h2>
        <ul>
          <li>Education : {data.education1}</li>
          {data.education2==null?<></>:<li>Education : {data.education2}</li>}
        </ul>
      </div>
      <hr />
      <div>
        <h2>Technical Skills</h2>
        <ul>
          <li>{data.tech_skills}</li>
        </ul>
      </div>
      <hr />
      <div>
        <h2>Soft Skills</h2>
        <ul>
          <li>{data.soft_skills}</li>
        </ul>
      </div>
      <hr />
      <div>
        <h2>Certificates</h2>
        <ul>
          <li>{data.certificates}</li>
        </ul>
      </div>
      <hr />
      <div>
        <h2>Languages</h2>
        <ul>
          <li>{data.languages}</li>
        </ul>
      </div>
    </div>
    <center>
      <br />
      <button title='Delete resume' className='btn btn-danger' onClick={()=>handleDelete(data.id,data.photo)}>Delete</button> 
      <br />
      <br />


<div> <i> Customise resume</i></div>
<div>***Select Pattern*** </div>


<div className='d-flex justify-content-center'>

<div className='mx-4'>
<label htmlFor="pattern1"><b>Fill <FormatColorFillIcon></FormatColorFillIcon></b></label>
<input className='form-check-input border border-primary' onChange={handlePattern1} type="radio" name="pattern" id="pattern1" />
</div>

<div className='mx-4'>
<label htmlFor="pattern2"> <b>Gradient <GradientIcon></GradientIcon></b> </label>
<input className='form-check-input border border-primary' onChange={handlePattern2} type="radio" name="pattern" id="pattern2" />
</div>

</div>



{pattern1?<div>
      <label htmlFor="background_color">Choose background color</label>
      <input required title='Choose background color' id='background_color' type="color" value={background} onChange={(e)=>setBackground(e.target.value)}  className='w-25' />
      <br />
      <label htmlFor="text_color">Choose text color</label>
      <input required title='Choose text color' id='text_color' type="color"  value={textColor} onChange={(e)=>setTextColor(e.target.value)}  className='w-25' />

      <div className='p-4' style={{backgroundColor:`${background}`,color:`${textColor}`}}><h4>Demo Fill</h4></div>
      <button title='Save changes' onClick={()=>handleChanges(data.id)} className='btn btn-sm btn-success'>Save changes</button>
      <button title='Reset changes' onClick={()=>resetChanges(data.id)} className='btn btn-sm btn-outline-danger'>Reset changes</button>
      </div>:<></>}




{pattern2?<div>
      <label htmlFor="color1">Color1</label>
      <input value={g_color1} required title='Choose color1' id='color1' type="color"  onChange={(e)=>setColor1(e.target.value)}  className='w-25' />
      <br />
      <label htmlFor="color2">Color2</label>
      <input value={g_color2} required title='Choose color2' id='color2' type="color" onChange={(e)=>setColor2(e.target.value)}  className='w-25' />
      <label htmlFor="text_color">Text color</label>
      <input value={g_TextColor} required title='Choose text color' id='text_color' type="color"  onChange={(e)=>set_g_textColor(e.target.value)}  className='w-25' />

    <br />
      <select value={alignment} onChange={(e)=>setAlignment(e.target.value)}>
        <option value="">---select alignment---</option>
        <option value="left">To left</option>
        <option value="right">To right</option>
        <option value="top">To top</option>
        <option value="bottom">To bottom</option>
      </select>
      <div className='p-4' style={{backgroundImage:`linear-gradient(to ${alignment}, ${g_color1}, ${g_color2})`,color:`${g_TextColor}`}}><h4>Demo Gradient</h4></div>




      <button title='Save changes' onClick={()=>handleChanges2(data.id)} className='btn btn-sm btn-success'>Save changes</button>
      <button title='Reset changes' onClick={()=>resetChanges2(data.id)} className='btn btn-sm btn-outline-danger'>Reset changes</button>
      </div>:<></>}
      </center>
    </div> 
    :
    <>You have not created resume yet <u> <small ><Link to="/home/resume" className='text-primary'>Create here</Link></small></u> </> }
    </>
  );
};

export default YourResume;
