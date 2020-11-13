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

export function sortTableToArray(restaurants) {
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
  return restaurantSort;
}

export function genreTableFilterToArray(restaurants, genreFilter) {
  const gf = genreFilter;
  const r = restaurants;
  const rf = [];
  for (let i = 0; i < r.length; i++) {
    if (r[i].genre.includes(gf)) {
      rf.push(r[i]);
    }
  }
  return rf;
}

export function stateTableFilterToArray(restaurants, stateFilter) {
  const sf = stateFilter;
  const r = restaurants;
  const rf = [];

  for (let i = 0; i < r.length; i++) {
    if (r[i].state === sf) {
      rf.push(r[i]);
    }
  }
  return rf;
}

export function allGenres(restaurants, callback) {
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
  callback(uniqueGenres);
}