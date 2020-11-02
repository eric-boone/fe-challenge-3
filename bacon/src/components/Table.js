import React from "react";

const Table = (props) => {
  const restaurants = props.restaurants;

  const rows = restaurants.map((restaurants) => (
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
    </div>
  );
};

export default Table;
