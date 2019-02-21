import React from "react";

const SearchBar = ({ onChange, searchKey }) => {
  return (
    <div className="form-group">
      <input
        onChange={onChange}
        placeholder="Search..."
        className="form-control"
        value={searchKey}
      />
    </div>
  );
};

export default SearchBar;
