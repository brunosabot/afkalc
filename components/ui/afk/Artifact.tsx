import i18n from "i18next";
import React from "react";
import artifacts from "../../../data/artifacts.json";
import { useTranslation } from "../../../i18n";
import styles from "./Artifact.module.css";

i18n.loadNamespaces("common");

interface IProps {
  name: string;
  highlight?: boolean;
  onClick?: () => void;
}

/**
 * TODO: Use i18n for name
 */
const Artifact: React.FC<IProps> = ({ name, onClick = () => {}, highlight = false }) => {
  const { t } = useTranslation("common");
  const artifact = artifacts.find((r) => r.name === name);

  if (artifact === undefined) return null;

  const highlightClassName = highlight ? styles.Highlight : "";

  return (
    <div
      className={`${styles.Wrapper} ${highlightClassName}`}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      onKeyPress={(event) => {
        if (event.key === "Enter") onClick();
      }}
    >
      <img src={artifact.image} className={styles.Artifact} alt={t(`item.${name}`)} />
    </div>
  );
};

export default Artifact;
