import React from "react";
import _ from "lodash"; //lodash is a optimized version of popular js library called underscore
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, itemsPerPage, currentPage, onPageChange }) => { //arg destructuring. taking properties of props argument directly
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  if (pagesCount === 1) return null;

  //use lodash range() method to return an array of pages using pagesCount
  const pages = _.range(1, pagesCount + 1); //+ 1 because range() method does not include the end number itself. mean if pagesCount is 4 it returns 3 in this method
  //if pageCount is 4 output is [1,2,3,4]
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Defining prop types using react prop-types library. use 'propTypes'
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired, 
  itemsPerPage: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired
};

//default export
export default Pagination;
