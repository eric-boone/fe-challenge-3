import React from "react";

const Table = (props) => {
  const restaurants = props.restaurants;

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
            <th>state</th>
            <th>telephone</th>
            <th>genre</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      {console.log(props.restaurants)}
      {console.log(restaurantSort)}
    </div>
  );
};

export default Table;
