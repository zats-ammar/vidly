import React from "react";

const Like = ({ liked, onClick }) => {//arg destructuring. taking properties of props argument directly
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
