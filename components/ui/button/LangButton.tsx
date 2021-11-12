import { useRouter } from "next/router";
import React from "react";
import styles from "./LangButton.module.css";

interface IProps {
  lang: string;
  emoji: string;
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

const LangButton: React.FC<IProps> = function LangButton({ lang, emoji }) {
  const router = useRouter();

  return (
    <button
      className={styles.LangButton}
      type="button"
      onClick={() => {
        setCookie("NEXT_LOCALE", lang, 365);
        router.push("/", "/", {
          locale: lang,
        });
      }}
    >
      <span role="img" aria-label={lang}>
        {emoji}
      </span>
    </button>
  );
};

export default LangButton;
