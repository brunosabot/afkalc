import React from "react";
import styles from "./BuyMeACoffee.module.css";

interface IProps {
  [key: string]: never;
}

const BuyMeACoffee: React.FC<IProps> = () => (
  <a
    href="https://www.buymeacoffee.com/brunosabot"
    target="_blank"
    rel="noreferrer"
    className={styles.BuyMeACoffee}
  >
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
      alt="Buy Me A Coffee"
      className={styles.BuyMeACoffeeImage}
    />
  </a>
);

export default BuyMeACoffee;
