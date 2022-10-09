import { mdiChevronLeftCircle, mdiChevronRightCircle } from "@mdi/js";
import React, { useEffect, useRef, useState } from "react";
import Svg from "../Svg";
import styles from "./CardTabs.module.css";

let interval: NodeJS.Timer;

interface IProps {
  children: React.ReactNode;
}

const CardTabs: React.FC<IProps> = function CardTabs({ children }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current?.scrollWidth !== ref.current?.offsetWidth) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
  }, [ref]);

  const leftButton = isScrollable && (
    <button
      className={styles.CardTabsButtonLeft}
      type="button"
      onMouseEnter={() => {
        interval = setInterval(() => {
          if (ref.current) {
            ref.current.scrollLeft -= 5;
          }
        }, 16);
      }}
      onMouseLeave={() => clearInterval(interval)}
    >
      <Svg d={mdiChevronLeftCircle} />
    </button>
  );

  const rightButton = isScrollable && (
    <button
      className={styles.CardTabsButtonRight}
      type="button"
      onMouseEnter={() => {
        interval = setInterval(() => {
          if (ref.current) {
            ref.current.scrollLeft += 5;
          }
        }, 16);
      }}
      onMouseLeave={() => clearInterval(interval)}
    >
      <Svg d={mdiChevronRightCircle} />
    </button>
  );

  return (
    <div className={`${styles.CardTabsWrapper} ${isScrollable ? styles.WithScroll : ""}`}>
      {leftButton}
      <div className={styles.CardTabs} ref={ref}>
        {children}
      </div>
      {rightButton}
    </div>
  );
};

export default CardTabs;
