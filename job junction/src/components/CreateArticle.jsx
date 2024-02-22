// CreateArticle.js

import React, { useState } from 'react';
import '../css/CreateArticle.css';

const CreateArticle = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions like submitting data to a server here
    console.log('Article Submitted:', { image, title, description });
  };

  return (
    <div className="create-article-container">
      <h2>Create Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateArticle;
