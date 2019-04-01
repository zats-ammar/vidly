import React from "react";

const SearchBar = ({ onChange, searchKey }) => {
  return (
    <div className="form-group">
      <input
        onChange={e => onChange(e.currentTarget.value)}
        placeholder="Search..."
        className="form-control"
        value={searchKey}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
