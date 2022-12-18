import { mdiArrowLeft } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import Svg from "../../../ui/Svg";
import styles from "./BackTiersList.module.css";

interface Props {
  id: string;
}

const BackTiersList: React.FC<Props> = function BackTiersList({ id }) {
  const { t } = useTranslation("priority-list");

  return (
    <div className={styles.BackTiersList}>
      <Link href={`/tiers-list/${id}`} className={styles.Link}>
        <Svg d={mdiArrowLeft} />

        {t("label-back")}
      </Link>
    </div>
  );
};

export default BackTiersList;
