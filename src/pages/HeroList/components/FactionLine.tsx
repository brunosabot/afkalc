import React from "react";

interface IProps {
  name: string;
}

const FactionLine: React.FC<IProps> = ({ name }) => {
  const fileName = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div className="hero-list__faction">
      <img className="hero-list__faction-image" src={`/factions/${fileName}.png`} alt={name} />
      <div className="hero-list__faction-name">{name}</div>
      <div className="hero-list__faction-label">SI</div>
      <div className="hero-list__faction-label">Inn</div>
      <div className="hero-list__faction-placeholder" />
    </div>
  );
};

export default FactionLine;
