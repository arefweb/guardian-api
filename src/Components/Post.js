import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Post = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  const getArticle = async () => {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/${id}?api-key=${process.env.REACT_APP_API_KEY}&show-fields=all`
      );
      const data = await response.json();
      setArticle(data.response.content.fields);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, [loading]);


  if(loading){
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    );
  }

    return (
      <section className="post">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 back">
              <button className="back__btn" onClick={()=>{
                window.history.back();
              }}>
                <FaArrowLeft />
              </button>
            </div>
          </div>
          <div className="row post__row">
            {!loading && (
              <div className="col-sm-8 post__col">
                <div className="post__thumbnail">
                  <img src={article.thumbnail} />
                </div>
                <div className="post__heading">
                  <h1>{article.headline}</h1>
                </div>
                <div className="post__meta">
                  <p className="post__meta-date">
                    Date:{" "}
                    {
                      new Date(`${article.firstPublicationDate}`)
                        .toLocaleString()
                        .split(",")[0]
                    }
                  </p>
                  <p className="post__meta-url">
                    <a href={article.shortUrl} noopener target="_blank">
                      <FaExternalLinkAlt />
                    </a>
                  </p>
                </div>
                <article className="post__content">{article.bodyText}</article>
              </div>
            )}
          </div>
        </div>
      </section>
    );


};

export default Post;
