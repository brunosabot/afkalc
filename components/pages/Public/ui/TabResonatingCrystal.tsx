import { mdiPencil } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { IFirebasePve } from "../../../providers/types/IFirebasePve";
import Svg from "../../../ui/Svg";
import classes from "./TabResonatingCrystal.module.css";

interface ITabResonatingCrystalProps {
  isSelf: boolean;
  pve?: IFirebasePve;
}

const TabResonatingCrystal: React.FC<ITabResonatingCrystalProps> = function TabResonatingCrystal({
  pve,
  isSelf,
}) {
  const { t } = useTranslation("pve");

  return (
    <div className={classes.TabResonatingCrystal}>
      <img src="/background/img_backflow_freeHero_bg.png" className={classes.Background} alt="" />
      {isSelf ? (
        <Link href="/pve" className={classes.Action}>
          <Svg d={mdiPencil} />
        </Link>
      ) : null}
      <div className={classes.ResonatingCrystal}>
        <span className={classes.Name}>{t("label-crystal-level")}</span>
        <span className={classes.Level}>
          <span className={classes.Emphasis}>{t("label-level", { level: pve?.crystal })}</span>/
          {pve?.crystalMax}
        </span>
      </div>
    </div>
  );
};

export default TabResonatingCrystal;
