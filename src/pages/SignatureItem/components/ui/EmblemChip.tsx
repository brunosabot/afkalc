import React from "react";

interface IProps {
  count: number;
  image: string;
  name: string;
}

const EmblemChip: React.FC<IProps> = ({ count, image, name }) => {
  return count > 0 ? (
    <div className="emblem-count__wrapper">
      {count}
      <img src={image} className="emblem" alt={name} />
    </div>
  ) : null;
};

export default EmblemChip;
