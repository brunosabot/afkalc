import Image from "next/image";
import React from "react";
import styles from "./Relic.module.css";

interface Props {
  relic: number;
  level: number;
  counter: number;
  quantity: number;
  setQuantity: (relicId: number, value: number) => void;
}

const Relic: React.FC<Props> = function Relic({ counter, relic, level, quantity, setQuantity }) {
  return (
    <div className={styles.Wrapper}>
      <div className={`${styles.Relic} ${styles[`Relic--${level}`]}`}>
        <Image
          className={styles.Image}
          key={relic}
          src={`/relics/relic_${relic}.png`}
          alt={`${relic}`}
          height={40}
          width={40}
        />
        {counter > 0 ? (
          <span data-testid="counter" className={styles.Counter}>
            {counter}
          </span>
        ) : null}
      </div>
      <input
        inputMode="numeric"
        className={styles.Input}
        value={quantity || ""}
        onChange={(e) => {
          setQuantity(relic, parseInt(e.target.value, 10) || 0);
        }}
      />
    </div>
  );
};

export default Relic;
