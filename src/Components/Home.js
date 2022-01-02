import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "./Pagination"
import { connect } from "react-redux";


const Home = ({ query , page, articles, dispatch }) => {
  const [loading, setLoading] = useState(true);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_PAGE", payload: 1 });
    setLoading(true);
  };

  const handlePageClick = (p) => {
    console.log(p);
    if (p.payload === "previous") {
      if (page.currentPage === 1) {
        dispatch({ type: "SET_PAGE", payload: 1 });
      } else {
        dispatch({ type: "SET_PAGE", payload: page.currentPage - 1 });
      }
    } else if (p.payload === "next") {
      if (page.currentPage === page.totalPage) {
        dispatch({ type: "SET_PAGE", payload: page.totalPage });
      } else {
        dispatch({ type: "SET_PAGE", payload: page.currentPage + 1 });
      }
    } else {
      dispatch({ type: "SET_PAGE", payload: p.payload });
    }
    setLoading(true);
  };

  const getArticles = async () => {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/search?page-size=9&order-by=relevance&show-fields=all&page=${page.currentPage}&q=${query}&api-key=7b979b22-ab7e-4d58-b00a-8c747f8fc795`
      );
      const data = await response.json();
      dispatch({ type: "SET_ARTICLES", payload: data.response.results });
      dispatch({ type: "SET_TOTAL_PAGE", payload: data.response.pages });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, [loading]);

  useEffect(() => {
    const activeNumber = page.currentPage;
    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove("active");
    }
    const allPages = Array.from(
      document.querySelectorAll(".pagination__list li[id]")
    );
    allPages.forEach((activePage) => {
      if (activePage.id == activeNumber) {
        activePage.classList.add("active");
      }
    });
  }, [page]);

  if (loading === true) {
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
    <main>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 search">
            <div className="search__wrapper">
              <form onSubmit={handleSubmit} className="search__form">
                <label htmlFor="search">Search: </label>
                <input
                  type="text"
                  id="search"
                  value={query}
                  onChange={(e) =>
                    dispatch({ type: "SET_QUERY", payload: e.target.value })
                  }
                  className="search__form-input"
                />
                <button type="submit" className="search__form-btn">
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <aside className="col-12 search-term">
            <p>
              Search Term: <i>{query}</i>
            </p>
            <hr />
          </aside>
        </div>
      </div>

      {!loading && (
        <div className="container">
          <div className="row">
            {articles.length !== 0 ? (
              articles.map((article, index) => {
                const { fields } = article;
                return (
                  <div className="col-md-4 col-sm-6 news" key={index}>
                    <article className="news__card">
                      <img src={fields.thumbnail} className="news__card-img" />
                      <div className="news__card-content">
                        <h2 className="news__card-headline">
                          {fields.headline}
                        </h2>
                        <p className="news__card-exerpt">{fields.trailText}</p>
                        <p className="news__card-date">
                          Date:{" "}
                          {
                            new Date(`${fields.firstPublicationDate}`)
                              .toLocaleString()
                              .split(",")[0]
                          }
                        </p>
                        <Link
                          to={`/post/${article.id}`}
                          className="news__card-btn"
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })
            ) : (
              <h3>
                no results for <i>{query}</i>. try another
              </h3>
            )}
          </div>
        </div>
      )}

      {/* PAGINATION */}
      {articles.length !== 0 && (
        <div className="container pb-5">
          <div className="row">
            <div className="col-sm-12 pagination">
              <Pagination
                totalPage={page.totalPage}
                currentPage={page.currentPage}
                handlePageClick={handlePageClick}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const mapStateToProps = (state) => {
  const { query, page, articles} = state;
  return { query, page, articles };
};



export default connect(mapStateToProps)(Home);
