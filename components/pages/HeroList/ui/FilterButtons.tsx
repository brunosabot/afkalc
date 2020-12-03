import React from "react";
import styles from "./FilterButtons.module.css";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
  imagePath: string;
  data: string[];
}

const FilterButtons: React.FC<IProps> = ({ filter, setFilter, imagePath, data }) => {
  return (
    <div className={styles.Wrapper}>
      {data.map((e) => {
        const className = `${styles.FilterButtons} ${filter === e ? styles.Active : ""}`;
        const onCLick = () => {
          setFilter(filter === e ? "" : e);
        };

        return (
          <button key={e} className={className} type="button" onClick={onCLick}>
            <img alt={e} className={styles.Image} src={`/${imagePath}/${e}.png`} />
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;
