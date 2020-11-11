import React from "react";

const Pagination = ({ rowsPerPage, totalRows, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <p>Pagination works</p>
    </div>
  );
};

export default Pagination;
