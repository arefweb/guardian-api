import React from "react";

const Pagination = ({ totalPage, currentPage, handlePageClick }) => {
  let pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }

  function range() {
    let showRange;
    if (currentPage === 1) {
      showRange = pages.splice(0, currentPage + 2);
    } else if (currentPage === pages.length) {
      showRange = pages.splice(currentPage - 3);
    } else {
      showRange = pages.splice(currentPage - 2, 3);
    }
    return showRange;
  }
  // eslint-disable-next-line
  if (currentPage == 1 || currentPage == 2) {
    return (
      <ul className="pagination__list">
        <li
          className="pagination__list-previous"
          onClick={() => {
            handlePageClick({ payload: "previous" });
          }}
        >
          {" "}
          &lt; previous
        </li>
        {range().map((item, index) => {
          return (
            <li
              onClick={() => {
                handlePageClick({ payload: item });
              }}
              key={index}
              id={item}
            >
              {item}
            </li>
          );
        })}
        <li className="pagination__list-ellipsis"> ... </li>
        <li
          onClick={() => {
            handlePageClick({ payload: pages[pages.length - 1] });
          }}
        >
          {pages[pages.length - 1]}
        </li>
        <li
          onClick={() => {
            handlePageClick({ payload: "next" });
          }}
          className="pagination__list-next"
        >
          next &gt;{" "}
        </li>
      </ul>
    );
  }
  // eslint-disable-next-line
  if (currentPage == pages.length || currentPage == pages.length - 1) {
    return (
      <ul className="pagination__list">
        <li
          onClick={() => {
            handlePageClick({ payload: "previous" });
          }}
          className="pagination__list-previous"
        >
          {" "}
          &lt; previous
        </li>
        <li
          onClick={() => {
            handlePageClick({ payload: pages[0] });
          }}
        >
          {pages[0]}
        </li>
        <li className="pagination__list-ellipsis"> ... </li>
        {range().map((item, index) => {
          return (
            <li
              onClick={() => {
                handlePageClick({ payload: item });
              }}
              key={index}
              id={item}
            >
              {item}
            </li>
          );
        })}
        <li
          onClick={() => {
            handlePageClick({ payload: "next" });
          }}
          className="pagination__list-next"
        >
          next &gt;{" "}
        </li>
      </ul>
    );
  }

  return (
      <ul className="pagination__list">
        <li
          onClick={() => {
            handlePageClick({ payload: "previous" });
          }}
          className="pagination__list-previous"
        >
          {" "}
          &lt; previous
        </li>
        <li
          onClick={() => {
            handlePageClick({ payload: pages[0] });
          }}
        >
          {pages[0]}
        </li>
        <li className="pagination__list-ellipsis"> ... </li>
        {range().map((item, index) => {
          return (
            <li
              onClick={() => {
                handlePageClick({ payload: item });
              }}
              key={index}
              id={item}
            >
              {item}
            </li>
          );
        })}
        <li className="pagination__list-ellipsis"> ... </li>
        <li
          onClick={() => {
            handlePageClick({ payload: pages[pages.length - 1] });
          }}
        >
          {pages[pages.length - 1]}
        </li>
        <li
          onClick={() => {
            handlePageClick({ payload: "next" });
          }}
          className="pagination__list-next"
        >
          next &gt;{" "}
        </li>
      </ul>
    
  );
};

export default Pagination;
