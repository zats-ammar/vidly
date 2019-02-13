import React from "react";

const ListGroup = ({ //arg destructuring. taking properties of props argument directly
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]} //instead of using . notation to access properties, we use [] notation,
          //so ListGroup component is more reusable
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//adding default Props to this ListGroup Component. use 'defaultProps'
//assuming that most of the key/value pairs sent to this component has below property naming,
//we can add default props so from interface we no need to pass these props explicitly unless the property names are different than name & _id
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
