import React, { useEffect, useState } from "react";

import stateData from "../data/states.json";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Search from "./Search";

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
    allGenres(restaurants);
  }, [restaurants]);

  useEffect(() => {
    stateTableFilter(restaurants, stateFilter);
  }, [stateFilter]);

  useEffect(() => {
    genreTableFilter(restaurants, genreFilter);
  }, [genreFilter]);

  useEffect(() => {
    searchFor(restaurants, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!search) {
      sortTable(restaurants);
    }
  }, [search]);

  const currentRows = (rows, indexOfLastRow, indexOfFirstRow) => {
    const cR = [];
    if (rows.length > 0) {
      for (let i = indexOfFirstRow; i < indexOfLastRow; i++) {
        const element = rows[i];
        cR.push(element);
      }
    } else {
      const noRows = (
        <tr>
          <td colSpan="5">no restaurants found</td>
        </tr>
      );
      return noRows;
    }
    return cR;
  };

  function searchFor(restaurants, query, stateFilter, genreFilter) {
    sortTable(searchToArray(restaurants, query, stateFilter, genreFilter));
  }

  function searchToArray(restaurants, query, stateFilter, genreFilter) {
    let searchResults = [];
    const q = query.toLowerCase();
    restaurants.forEach((r) => {
      if (
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.genre.toLowerCase().includes(q)
      ) {
        searchResults.push(r);
      }
    });
    if (
      (!stateFilter || stateFilter === "all") &&
      (!genreFilter || genreFilter === "all")
    ) {
      return searchResults;
    } else if (!genreFilter || genreFilter === "all") {
      searchResults = stateTableFilterToArray(searchResults, stateFilter);
      return searchResults;
    } else if (!stateFilter || stateFilter === "all") {
      searchResults = genreTableFilterToArray(searchResults, genreFilter);
      return searchResults;
    } else {
      searchResults = stateTableFilterToArray(
        genreTableFilterToArray(searchResults, genreFilter),
        stateFilter
      );
      return searchResults;
    }
  }

  function allGenres(restaurants) {
    const genresArray = [];
    restaurants.forEach((restaurant) => {
      const array = [];
      array.push(restaurant.genre);
      array.forEach((r) => {
        r.split(",").forEach((r) => {
          genresArray.push(r);
        });
      });
    });
    const uniqueGenres = [...new Set(genresArray)];
    setGenres(uniqueGenres);
  }

  function stateTableFilter(restaurants, stateFilter) {
    if (stateFilter === "all") {
      sortTable(restaurants);
    } else {
      sortTable(stateTableFilterToArray(restaurants, stateFilter));
    }
  }

  function stateTableFilterToArray(restaurants, stateFilter) {
    const sf = stateFilter;
    const r = restaurants;
    const rf = [];
    if (stateFilter === "all") {
      sortTable(restaurants);
    } else {
      for (let i = 0; i < r.length; i++) {
        if (r[i].state === sf) {
          rf.push(r[i]);
        }
      }
      return rf;
    }
  }

  function genreTableFilter(restaurants, genreFilter) {
    if (genreFilter === "all") {
      sortTable(restaurants);
    } else {
      sortTable(genreTableFilterToArray(restaurants, genreFilter));
    }
  }

  function genreTableFilterToArray(restaurants, genreFilter) {
    const gf = genreFilter;
    const r = restaurants;
    const rf = [];
    if (genreFilter === "all") {
      sortTable(restaurants);
    } else {
      for (let i = 0; i < r.length; i++) {
        if (r[i].genre.includes(gf)) {
          rf.push(r[i]);
        }
      }
      return rf;
    }
  }

  function sortTable(restaurants) {
    const restaurantSort = [...restaurants];
    restaurantSort.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    makeRows(restaurantSort);
  }

  function makeRows(data) {
    const formattedRows = data.map((restaurants) => (
      <tr key={restaurants.id}>
        <td>{restaurants.name}</td>
        <td>{restaurants.city}</td>
        <td>{restaurants.state}</td>
        <td>{restaurants.telephone}</td>
        <td>{restaurants.genre}</td>
      </tr>
    ));
    setRows(formattedRows);
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
      <table>
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
