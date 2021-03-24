import Link from "next/link";
import React from "react";
import styles from "./LangButton.module.css";

interface IProps {
  lang: string;
  emoji: string;
}

// <Link followed by a is nextjs specific
/* eslint-disable jsx-a11y/anchor-is-valid */
const LangButton: React.FC<IProps> = ({ lang, emoji }) => (
  <Link href="/" locale={lang}>
    <a className={styles.LangButton}>
      <span role="img" aria-label={lang}>
        {emoji}
      </span>
    </a>
  </Link>
);
/* eslint-enable jsx-a11y/anchor-is-valid */

export default LangButton;
