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
    <div className="input-group col-md-3">
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
      />
      <div className="input-group-append">
        {search && (
          <button
            type="submit"
            value="x"
            onClick={handleClearSearch}
            className="btn btn-outline-danger"
          >
            Cancel
          </button>
        )}
        {!search && (
          <button
            type="submit"
            value="Search"
            onClick={handleSearch}
            className="btn btn-outline-success"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
