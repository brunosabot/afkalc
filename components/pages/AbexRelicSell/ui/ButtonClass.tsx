import React from "react";
import HeroClass from "../../../../types/HeroClass";
import styles from "./ButtonClass.module.css";

interface Props {
  current: HeroClass;
  theClass: HeroClass;
  onClick: (theClass: HeroClass) => void;
}

const ButtonClass: React.FC<Props> = ({ theClass, current, onClick }) => {
  const theClassClass = styles[`Button--${theClass}`];

  return (
    <button
      type="button"
      className={`${styles.Button} ${theClassClass}`}
      onClick={() => onClick(theClass)}
    >
      <img src={`/classes/${theClass}.png`} className={styles.Image} alt={theClass} />
      {theClass === current ? <div data-testid="current" className={styles.Current} /> : null}
    </button>
  );
};

export default ButtonClass;
