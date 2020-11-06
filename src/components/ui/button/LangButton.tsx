import i18n from "i18next";
import React from "react";

interface IProps {
  lang: string;
  emoji: string;
}

const LangButton: React.FC<IProps> = ({ lang, emoji }) => {
  return (
    <button className="button-lang" type="button" onClick={()=> i18n.changeLanguage(lang)}><span role="img" aria-label={lang}>{emoji}</span></button>
  );
};

export default LangButton;
