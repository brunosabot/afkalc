import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import resources from "../../../data/resources.json";
import styles from "./Item.module.css";

interface IProps {
  size?: "large" | "small" | "default";
  count?: number;
  name: string;
  infos?: string;
  highlight?: boolean;
  secondaryInfos?: string;
  onClick?: () => void;
}

/**
 * TODO: Use i18n for name
 */
const Item: React.FC<IProps> = function Item({
  count = 1,
  name,
  size = "default",
  infos,
  secondaryInfos,
  onClick = undefined,
  highlight = false,
}) {
  const { t } = useTranslation("common");
  const resource = resources.find((r) => r.name === name);

  if (resource === undefined) return null;

  const largeClassName = size === "large" ? styles.Large : "";
  const smallClassName = size === "small" ? styles.Small : "";
  const highlightClassName = highlight ? styles.Highlight : "";
  const onClickClassName = onClick ? styles.OnClick : "";

  return (
    <div
      className={`${styles.Wrapper} ${largeClassName} ${smallClassName} ${highlightClassName} ${onClickClassName}`}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      onKeyPress={(event) => {
        if (event.key === "Enter" && onClick) onClick();
      }}
    >
      <Image
        src={resource.image}
        className={styles.Item}
        alt={t(`item.${name}`) ?? ""}
        height={40}
        width={40}
      />
      {infos ? <span className={styles.Infos}>{t(`duration.${infos}`)}</span> : null}
      {secondaryInfos ? (
        <span className={styles.SecondaryInfos}>{t(`improvment.${secondaryInfos}`)}</span>
      ) : null}
      {count > 1 ? <span className={styles.Count}>{count}</span> : null}
    </div>
  );
};

export default Item;
