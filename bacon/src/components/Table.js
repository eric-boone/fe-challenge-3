import React, { useEffect, useState } from "react";

import stateData from "../data/states.json";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Search from "./Search";
import {
  makeRows,
  sortTableToArray,
  genreTableFilterToArray,
  stateTableFilterToArray,
  allGenres,
  searchToArray,
  currentRows
} from "../utilities/helpers";

const Table = (props) => {
  const restaurants = props.restaurants;
  const states = stateData;
  const [rows, setRows] = useState([]);
  const [stateFilter, setStateFilter] = useState();
  const [genreFilter, setGenreFilter] = useState();
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  useEffect(() => {
    sortTable(restaurants);
    allGenres(restaurants, setGenres);
  }, [restaurants]);

  useEffect(() => {
    if (!searchTerm) {
      stateTableFilter(restaurants, stateFilter);
    } else {
      searchFor(restaurants, searchTerm, stateFilter, genreFilter);
    }
  }, [stateFilter]);

  useEffect(() => {
    if (!searchTerm) {
      genreTableFilter(restaurants, genreFilter);
    } else {
      searchFor(restaurants, searchTerm, stateFilter, genreFilter);
    }
  }, [genreFilter]);

  useEffect(() => {
    searchFor(restaurants, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!search) {
      sortTable(restaurants);
    }
  }, [search]);

  function searchFor(restaurants, query, stateFilter, genreFilter) {
    sortTable(searchToArray(restaurants, query, stateFilter, genreFilter));
  }

  function stateTableFilter(restaurants, stateFilter) {
    if (stateFilter === "all") {
      sortTable(restaurants);
    } else {
      sortTable(stateTableFilterToArray(restaurants, stateFilter));
    }
  }

  function genreTableFilter(restaurants, genreFilter) {
    if (genreFilter === "all") {
      sortTable(restaurants);
    } else {
      sortTable(genreTableFilterToArray(restaurants, genreFilter));
    }
  }

  function sortTable(restaurants) {
    const restaurantSort = sortTableToArray(restaurants);
    makeRows(restaurantSort, setRows);
  }

  const addStateFilterHandler = (stateFilter) => {
    setStateFilter(stateFilter);
  };

  const addGenreFilterHandler = (genreFilter) => {
    setGenreFilter(genreFilter);
  };

  const searchForTerm = (term, bool) => {
    setSearchTerm(term);
    setSearch(bool);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Search onSearch={searchForTerm} />
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>city</th>
            <th>
              state
              <br />
              <Filter
                states={states}
                onAddStateFilter={addStateFilterHandler}
              />
            </th>
            <th>telephone</th>
            <th>
              genre
              <br />
              <Filter
                genres={genres}
                onAddGenreFilterHandler={addGenreFilterHandler}
              />
            </th>
          </tr>
        </thead>
        <tbody>{currentRows(rows, indexOfLastRow, indexOfFirstRow)}</tbody>
      </table>
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={rows.length}
        onPaginate={paginate}
      />
    </div>
  );
};

export default Table;
