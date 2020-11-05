import React from "react";

const Filter = (props) => {
  const statesToFilter = props.states;

  return (
    <div>
      <label htmlFor="states">state select</label>
      <select name="states" id="states">
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
