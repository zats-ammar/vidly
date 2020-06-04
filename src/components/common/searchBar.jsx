import React from "react";

const SearchBar = ({ onChange, searchKey }) => {
  return (
    <div className="form-group">
      <input
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Search..."
        className="form-control my-3"
        value={searchKey}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
