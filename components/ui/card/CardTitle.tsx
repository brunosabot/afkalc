import React from "react";

interface IProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<IProps> = ({ children }) => {
  return <div className="card__title">{children}</div>;
};

export default CardTitle;
