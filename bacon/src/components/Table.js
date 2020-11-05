import React from "react";

import stateData from "../data/states.json";
import Filter from "./Filter";

const Table = (props) => {
  const restaurants = props.restaurants;
  const states = stateData;

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

  const rows = restaurantSort.map((restaurants) => (
    <tr key={restaurants.id}>
      <td>{restaurants.name}</td>
      <td>{restaurants.city}</td>
      <td>{restaurants.state}</td>
      <td>{restaurants.telephone}</td>
      <td>{restaurants.genre}</td>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>city</th>
            <th>state <Filter states={states} /></th>
            <th>telephone</th>
            <th>genre</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
