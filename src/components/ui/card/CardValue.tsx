import React from "react";

interface IProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<IProps> = ({ children }) => {
  return (
    <div className="card__value-wrapper">
      <span className="card__value">{children}</span>
    </div>
  );
};

export default CardTitle;
