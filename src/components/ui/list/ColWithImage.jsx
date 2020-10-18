import React from "react";

const ColWithImage = ({ actions, image, title }) => {
  return (
    <div className="col-with-image">
      <img className="col-with-image__image" src={image} alt={title} />
      {title}
      <div className="col-with-image__actions">{actions}</div>
    </div>
  );
};

export default ColWithImage;
