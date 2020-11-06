import React, { useEffect, useState } from "react";

const Filter = (props) => {
  const statesToFilter = props.states;
  const [stateToFilter, setStateToFilter] = useState();

  useEffect(() => {
    props.onAddStateFilter(stateToFilter);
  }, [stateToFilter]);

  const setStateFilter = (event) => {
    event.preventDefault();
    setStateToFilter(event.target.value);
  }

  return (
    <div>
      <label htmlFor="states">state select</label>
      <select name="states" id="states" onChange={setStateFilter}>
        <option value="all" defaultValue>
          All
        </option>
        {statesToFilter.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
        ;
      </select>
      {console.log(statesToFilter)};
    </div>
  );
};
export default Filter;
