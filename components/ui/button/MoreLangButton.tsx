import { mdiPlus } from "@mdi/js";
import React from "react";
import Svg from "../Svg";
import styles from "./MoreLangButton.module.css";

interface IProps {
  [key: string]: never;
}

const MoreLangButton: React.FC<IProps> = function MoreLangButton() {
  return (
    <a
      className={styles.MoreLangButton}
      href="https://crowdin.com/project/afkalc"
      target="_blank"
      rel="noreferrer"
    >
      <Svg d={mdiPlus} />
    </a>
  );
};

export default MoreLangButton;
