export function makeRows(data, callback) {
  const formattedRows = data.map((restaurants) => (
    <tr key={restaurants.id}>
      <td>{restaurants.name}</td>
      <td>{restaurants.city}</td>
      <td>{restaurants.state}</td>
      <td>{restaurants.telephone}</td>
      <td>{restaurants.genre}</td>
    </tr>
  ));
  callback(formattedRows);
}
