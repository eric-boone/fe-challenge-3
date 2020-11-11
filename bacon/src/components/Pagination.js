import React from "react";

const Pagination = ({ rowsPerPage, totalRows, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <a onClick={() => paginate(number)} key={number} href="!#">{number}</a>
      ))}
    </div>
  );
};

export default Pagination;
