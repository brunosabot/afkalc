import React from "react";

interface IProps {
  actions: React.ReactNode;
  image: string;
  title: string;
}

const ColWithImage: React.FC<IProps> = ({ actions, image, title }) => {
  return (
    <div className="col-with-image">
      <img className="col-with-image__image" src={image} alt={title} />
      {title}
      <div className="col-with-image__actions">{actions}</div>
    </div>
  );
};

export default ColWithImage;
