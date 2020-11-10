import React, { useState, useEffect } from "react";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    props.onSearch(searchTerm, search);
  }, [search]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(true);
  };

  const handleClearSearch = (event) => {
    event.preventDefault();
    setSearchTerm("");
    setSearch(false);
  };

  return (
    <form>
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {search && <input type="submit" value="x" onClick={handleClearSearch} />}
      {!search && <input type="submit" value="Search" onClick={handleSearch} />}
    </form>
  );
};

export default Search;
