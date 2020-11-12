import React from "react";

interface IProps {
  children: React.ReactNode;
}

const Card: React.FC<IProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
