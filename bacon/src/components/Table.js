import React, { useEffect, useState } from "react";

import stateData from "../data/states.json";
import Filter from "./Filter";
import Search from "./Search";

const Table = (props) => {
  const restaurants = props.restaurants;
  const states = stateData;
  const [rows, setRows] = useState([]);
  const [stateFilter, setStateFilter] = useState();
  const [genreFilter, setGenreFilter] = useState();
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  function searchFor(arr, query) {
    const searchResults = [];
    const q =  query.toLowerCase()
    arr.forEach((r) => {
      if (
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.genre.toLowerCase().includes(q)
      ) {
        searchResults.push(r);
      }
    });
    makeRows(searchResults);
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
      makeRows(rf);
    }
  }

  function genreTableFilter(restaurants, genreFilter) {
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
      makeRows(rf);
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
    if (data.length === 0) {
      const noRows = (
        <tr>
          <td colSpan="5">no restaurants found</td>
        </tr>
      );
      setRows(noRows);
    } else {
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
  }

  const addStateFilterHandler = (stateFilter) => {
    setStateFilter(stateFilter);
  };

  const addGenreFilterHandler = (genreFilter) => {
    setGenreFilter(genreFilter);
  };

  const searchForTerm = (term) => {
    setSearchTerm(term);
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
        <tbody>{rows}</tbody>
      </table>
      {/* {console.log("searchTerm", searchTerm)} */}
      {/* {console.log("searchedRows", searchedRows)} */}
    </div>
  );
};

export default Table;
