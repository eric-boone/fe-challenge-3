import React, { useEffect, useState } from "react";

import stateData from "../data/states.json";
import Filter from "./Filter";

const Table = (props) => {
  const restaurants = props.restaurants;
  const states = stateData;
  const [rows, setRows] = useState([]);
  const [stateFilter, setStateFilter] = useState();

  useEffect(() => {
    sortTable(restaurants);
  }, [restaurants]);

  useEffect(() => {
    stateTableFilter(restaurants, stateFilter);
  }, [stateFilter]);

  function stateTableFilter(restaurants, stateFilter) {
    const sf = stateFilter;
    const r = restaurants;
    const rf = [];

    for (let i = 0; i < r.length; i++) {
      if (r[i].state === sf) {
        rf.push(r[i]);
      }
    }

    const stuff = makeRows(rf);

    setRows(stuff);
  }

  function sortTable(restaurants) {
    const restaurantSort = [...props.restaurants];
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>city</th>
            <th>
              state{" "}
              <Filter
                states={states}
                onAddStateFilter={addStateFilterHandler}
              />
            </th>
            <th>telephone</th>
            <th>genre</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      {console.log("rows", rows)}
      {/* {console.log("props", props)} */}
    </div>
  );
};

export default Table;
