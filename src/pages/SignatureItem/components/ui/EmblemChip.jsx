import React from "react";

const EmblemChip = ({ count, image, name }) => {
  return count > 0 ? (
    <div className="emblem-count__wrapper">
      {count}
      <img src={image} className="emblem" alt={name} />
    </div>
  ) : null;
};

export default EmblemChip;
