import React from "react";
import styles from "./InfoDetails.module.css";

interface IProps {
  value?: number;
  children: string;
}

const InfoDetails: React.FC<IProps> = function InfoDetails({ value, children }) {
  if (value === null || value === undefined || value === 0 || value === -1) {
    return null;
  }

  return <span className={styles.InfosDetail}>{children}</span>;
};

export default InfoDetails;
