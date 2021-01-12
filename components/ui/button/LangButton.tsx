import dayjs from "dayjs";
import React from "react";
import { i18n } from "../../../i18n";
import styles from "./LangButton.module.css";

interface IProps {
  lang: string;
  emoji: string;
}

// <Link followed by a is nextjs specific
/* eslint-disable jsx-a11y/anchor-is-valid */
const LangButton: React.FC<IProps> = ({ lang, emoji }) => (
  <button
    type="button"
    className={styles.LangButton}
    onClick={() => {
      i18n.changeLanguage(lang);
      dayjs.locale(lang);
    }}
  >
    <span role="img" aria-label={lang}>
      {emoji}
    </span>
  </button>
);
/* eslint-enable jsx-a11y/anchor-is-valid */

export default LangButton;
