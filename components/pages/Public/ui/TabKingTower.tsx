import { mdiPencil } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { IFirebasePve } from "../../../providers/types/IFirebasePve";
import Svg from "../../../ui/Svg";
import classes from "./TabKingTower.module.css";

interface ITabKingTowerProps {
  isSelf: boolean;
  pve?: IFirebasePve;
}

const TabKingTower: React.FC<ITabKingTowerProps> = function TabKingTower({ pve, isSelf }) {
  const { t } = useTranslation("public");
  const { t: tPve } = useTranslation("pve");

  return (
    <div className={classes.TabKingTower}>
      {isSelf ? (
        <Link href="/pve">
          <a className={classes.Action}>
            <Svg d={mdiPencil} />
          </a>
        </Link>
      ) : null}
      <div className={classes.KingTower}>
        <span className={classes.Name}>{tPve("label-kings-tower")}</span>
        <span className={classes.Level}>{t("label-floor", { floor: pve?.kingTower ?? 1 })}</span>
      </div>
      <div className={classes.LighbearerTower}>
        <span className={classes.Name}>
          <img className={classes.FactionIcon} src="/factions/lightbearers.png" alt="" />
          {tPve("label-lightbearer-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.lightbearerTower ?? 1 })}
        </span>
      </div>
      <div className={classes.MaulerTower}>
        <span className={classes.Name}>
          <img className={classes.FactionIcon} src="/factions/maulers.png" alt="" />
          {tPve("label-mauler-tower")}
        </span>
        <span className={classes.Level}>{t("label-floor", { floor: pve?.maulerTower ?? 1 })}</span>
      </div>
      <div className={classes.WilderTower}>
        <span className={classes.Name}>
          <img className={classes.FactionIcon} src="/factions/wilders.png" alt="" />
          {tPve("label-wilder-tower")}
        </span>
        <span className={classes.Level}>{t("label-floor", { floor: pve?.wilderTower ?? 1 })}</span>
      </div>
      <div className={classes.GravebornTower}>
        <span className={classes.Name}>
          <img className={classes.FactionIcon} src="/factions/graveborns.png" alt="" />
          {tPve("label-graveborn-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.gravebornTower ?? 1 })}
        </span>
      </div>
      <div className={classes.CelestialTower}>
        <span className={classes.Name}>
          <img className={classes.FactionIcon} src="/factions/celestials.png" alt="" />
          {tPve("label-celestial-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.celestialTower ?? 1 })}
        </span>
      </div>
      <div className={classes.HypogeanTower}>
        <span className={classes.Name}>
          <img className={classes.FactionIcon} src="/factions/hypogeans.png" alt="" />
          {tPve("label-hypogean-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.hypogeanTower ?? 1 })}
        </span>
      </div>
    </div>
  );
};

export default TabKingTower;
