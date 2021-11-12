import React from "react";
import styles from "./ColWithImage.module.css";

interface IProps {
  actions: React.ReactNode;
  image: React.ReactNode;
  title: string;
}

const ColWithImage: React.FC<IProps> = function ColWithImage({ actions, image, title }) {
  return (
    <div className={styles.ColWithImage}>
      <div className={styles.Image}>{image}</div>
      {title}
      <div className={styles.Actions}>{actions}</div>
    </div>
  );
};

export default ColWithImage;
