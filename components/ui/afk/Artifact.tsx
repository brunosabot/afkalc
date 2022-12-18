import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import artifacts from "../../../data/artifacts.json";
import styles from "./Artifact.module.css";

interface IProps {
  name: string;
  highlight?: boolean;
  onClick?: () => void;
}

/**
 * TODO: Use i18n for name
 */
const Artifact: React.FC<IProps> = function Artifact({
  name,
  onClick = () => {},
  highlight = false,
}) {
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
      <Image
        src={artifact.image}
        className={styles.Artifact}
        alt={t(`artifact.${name}`) ?? ""}
        height={64}
        width={64}
      />
    </div>
  );
};

export default Artifact;
