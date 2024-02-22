import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/Article.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Articles() {
  const [data, setData] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [likedArticles2, setLikedArticles2] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('name'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [totalLike, setTotalLike] = useState(0);
  const [visible, setVisible] = useState(null); // Initialize as null

  const fetchData = () => {
    axios
      .get("http://localhost:2000/getarticles")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2000/deletearticle/${id}`)
      .then(res => {
        setTimeout(() => {
          fetchData();
        }, 1000);
      })
      .catch(err => console.log(err))
  }

  const like = (id, title) => {
    setVisible(id); // Set visible when like button is clicked
    axios.post('http://localhost:2000/likes', { id, username, password, title })
      .then(res => {
        if (res.data === 'liked' || res.data === 'deleted') {
          getTotalLike(title); // Update total likes after successful like or delete
          likes(); // Update liked articles after successful like or delete
        }
      })
      .catch(err => {
        console.log(err);
      });   
  };

  const likes = () => {
    axios.get('http://localhost:2000/getlikes', { params: { username, password } })
      .then(res => {
        setLikedArticles(res.data);
        const likedArticlesArray = res.data.map(ele => `${ele.id}-${username}-${ele.title}-${password}`);
        setLikedArticles2(likedArticlesArray);
      })
      .catch(err => console.log(err));
  };

  const getTotalLike = (title) => {
    axios.get('http://localhost:2000/totallike', { params: {title } })
      .then(res => {
        setTotalLike(res.data.totalLikes);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    likes(); // Initial load of liked articles
    getTotalLike(); // Initial load of total likes
  }, [username, password]);

  return (
    <div>
      <div className="row container">
        {
          data.length === 0 ? <>No articles available</> : data.map((ele) => (
            <div key={ele.id} className="col-lg-3 col-md-6 col-sm-12 mb-4 body">
              <div className="card">
                <div>
                  {ele.username === localStorage.getItem('name') ?
                    <span className="alert alert-primary">Created by <b>you</b> </span> :
                    <span className="alert alert-warning">Created by <b>{ele.username}</b> </span>
                  }
                </div>
                <img title={ele.title} src={`http://localhost:2000/Articles/${ele.image}`} alt="Article Image" className="card-img" />
                <div className="card-body">
                  <h5 className="card-title">{ele.title}</h5>
                  <p className="card-text">
                    {ele.description}
                  </p>
                </div>
                <div className="card-buttons">
                  <b
                    title={likedArticles2.includes(`${ele.id}-${username}-${ele.title}-${password}`) ?'dislike':'like'}
                    style={{ color: likedArticles2.includes(`${ele.id}-${username}-${ele.title}-${password}`) ? 'red' : 'black' }}
                    onClick={() => like(ele.id, ele.title)}
                  >
                    <FavoriteBorderIcon className="like" />
                  </b>
                  {/* Display total likes */}
                  {visible === ele.id && <b>{totalLike}  </b>} <strong>Likes</strong> 
                  {ele.username === localStorage.getItem('name') &&
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(ele.id)}>Delete</button>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Articles;
