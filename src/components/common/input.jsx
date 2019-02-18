import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  //...rest param includes properties other than name,label,error
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        // value={value} //these are the rest props
        // onChange={onChange} //these are the rest props
        // type={type} //these are the rest props
        {...rest} //furthur refactoring to spread the rest of the props directly into input field as to prevent coming into this component and define props seperately
        name={name}
        id={name}
        className="form-control"
        autoComplete="off"
      />
      {/* conditional rendering of elements. this element is rendered only if error is truthy, otherwise ignore */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
