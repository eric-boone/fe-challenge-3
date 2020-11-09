import React, { useEffect, useState } from "react";

const Filter = (props) => {
  const states = props.states;
  const genres = props.genres;
  const item = props.states || props.genres;
  // const [stateToFilter, setStateToFilter] = useState();
  const [filterOn, setFilterOn] = useState();

  useEffect(() => {
    if (states) {
      props.onAddStateFilter(filterOn);
    }
    if (genres) {
      props.onAddGenreFilterHandler(filterOn);
    }
  }, [filterOn]);

  const setFilter = (event) => {
    event.preventDefault();
    setFilterOn(event.target.value);
  };

  return (
    <div>
      <label htmlFor="states">select</label>
      <select name="states" id="states" onChange={setFilter}>
        <option value="all" defaultValue>
          All
        </option>
        {item &&
          item.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        ;
      </select>
    </div>
  );
};
export default Filter;
