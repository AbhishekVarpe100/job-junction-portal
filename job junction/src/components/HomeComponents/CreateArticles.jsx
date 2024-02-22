import React, { useState } from 'react';
import axios from 'axios';
function CreateArticles() {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [articleImage, setArticleImage] = useState(null);

  const handleTitleChange = (event) => {
    setArticleTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setArticleDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setArticleImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   const formData=new FormData();
   formData.append('title',articleTitle);
   formData.append('description',articleDescription);
   formData.append('image',articleImage);
   formData.append('username',localStorage.getItem('name'));
   formData.append('password',localStorage.getItem('password'));
    axios.post('http://localhost:2000/createarticle',formData)
    .then(res=>{
        if(res){
            alert("Created")
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="articleTitle">Title of Article</label>
              <input type="text" className="form-control" id="articleTitle" placeholder="Enter a title of article" value={articleTitle} onChange={handleTitleChange} />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="articleDescription">Description of Article</label>
              <textarea className="form-control" id="articleDescription" rows="5" placeholder="Description of article" value={articleDescription} onChange={handleDescriptionChange}></textarea>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="articleFile">Upload image of article</label>
              <input type="file" className="form-control-file" id="articleFile" onChange={handleImageChange} />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <input type="submit" className='btn btn-primary' value="Create" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateArticles;
