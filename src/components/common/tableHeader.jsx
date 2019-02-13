import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      //if currently sorted column is clicked
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      //if a new column is clicked
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn); //raise sort event
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
            className="clickable"
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key} //use path as key if not available us key as key
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
