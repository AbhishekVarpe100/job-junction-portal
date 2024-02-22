import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/Article.css';

function Articles() {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <div className="row container">
        {
          data.length === 0 ? <>No article available</> : data.map((ele) => (
            <div key={ele.id} className="col-lg-3 col-md-6 col-sm-12 mb-4 body">
              <div className="card">
                <img src={`http://localhost:2000/Articles/${ele.image}`} alt="Article Image" className="card-img" />
                <div className="card-body">
                  <h5 className="card-title">{ele.title}</h5>
                  <p className="card-text">
                    {ele.description}
                  </p>
                </div>
                <div className="card-buttons">
                  <button className="like-button">Like</button>
                  <button className="dislike-button">Dislike</button>
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
