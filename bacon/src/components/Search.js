import React, { useState, useEffect } from "react";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    props.onSearch(searchTerm);
  }, [search]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(!search);
  };

  return (
    <form>
      <label>
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" onClick={handleSearch} />
    </form>
  );
};

export default Search;
