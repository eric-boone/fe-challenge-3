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

    const rowsSorted = restaurantSort.map((restaurants) => (
      <tr key={restaurants.id}>
        <td>{restaurants.name}</td>
        <td>{restaurants.city}</td>
        <td>{restaurants.state}</td>
        <td>{restaurants.telephone}</td>
        <td>{restaurants.genre}</td>
      </tr>
    ));

    setRows(rowsSorted);
  }

  // function filterTable() {};

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
