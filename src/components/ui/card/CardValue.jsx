import React from "react";

const CardTitle = ({ children }) => {
  return (
    <div className="card__value-wrapper">
      <span className="card__value">{children}</span>
    </div>
  );
};

export default CardTitle;
