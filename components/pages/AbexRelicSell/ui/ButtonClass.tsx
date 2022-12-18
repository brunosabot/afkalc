import Image from "next/image";
import React from "react";
import HeroClass from "../../../../types/HeroClass";
import styles from "./ButtonClass.module.css";

interface Props {
  current: HeroClass;
  theClass: HeroClass;
  onClick: (theClass: HeroClass) => void;
}

const ButtonClass: React.FC<Props> = function ButtonClass({ theClass, current, onClick }) {
  const theClassClass = styles[`Button--${theClass}`];

  return (
    <button
      type="button"
      className={`${styles.Button} ${theClassClass}`}
      onClick={() => onClick(theClass)}
    >
      <Image
        src={`/classes/${theClass}.png`}
        className={styles.Image}
        alt={theClass}
        height={64}
        width={64}
      />
      {theClass === current ? <div data-testid="current" className={styles.Current} /> : null}
    </button>
  );
};

export default ButtonClass;
