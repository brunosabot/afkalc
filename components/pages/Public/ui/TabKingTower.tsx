import { mdiPencil } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Image from "next/image";
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
      <img src="/background/king-tower.png" className={classes.Background} alt="" />
      {isSelf ? (
        <Link href="/pve" className={classes.Action}>
          <Svg d={mdiPencil} />
        </Link>
      ) : null}
      <div className={classes.KingTower}>
        <span className={classes.Name}>{tPve("label-kings-tower")}</span>
        <span className={classes.Level}>{t("label-floor", { floor: pve?.kingTower ?? 1 })}</span>
      </div>
      <div className={classes.LighbearerTower}>
        <span className={classes.Name}>
          <Image
            className={classes.FactionIcon}
            src="/factions/lightbearers.png"
            alt=""
            height={16}
            width={16}
          />
          {tPve("label-lightbearer-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.lightbearerTower ?? 1 })}
        </span>
      </div>
      <div className={classes.MaulerTower}>
        <span className={classes.Name}>
          <Image
            className={classes.FactionIcon}
            src="/factions/maulers.png"
            alt=""
            height={16}
            width={16}
          />
          {tPve("label-mauler-tower")}
        </span>
        <span className={classes.Level}>{t("label-floor", { floor: pve?.maulerTower ?? 1 })}</span>
      </div>
      <div className={classes.WilderTower}>
        <span className={classes.Name}>
          <Image
            className={classes.FactionIcon}
            src="/factions/wilders.png"
            alt=""
            height={16}
            width={16}
          />
          {tPve("label-wilder-tower")}
        </span>
        <span className={classes.Level}>{t("label-floor", { floor: pve?.wilderTower ?? 1 })}</span>
      </div>
      <div className={classes.GravebornTower}>
        <span className={classes.Name}>
          <Image
            className={classes.FactionIcon}
            src="/factions/graveborns.png"
            alt=""
            height={16}
            width={16}
          />
          {tPve("label-graveborn-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.gravebornTower ?? 1 })}
        </span>
      </div>
      <div className={classes.CelestialTower}>
        <span className={classes.Name}>
          <Image
            className={classes.FactionIcon}
            src="/factions/celestials.png"
            alt=""
            height={16}
            width={16}
          />
          {tPve("label-celestial-tower")}
        </span>
        <span className={classes.Level}>
          {t("label-floor", { floor: pve?.celestialTower ?? 1 })}
        </span>
      </div>
      <div className={classes.HypogeanTower}>
        <span className={classes.Name}>
          <Image
            className={classes.FactionIcon}
            src="/factions/hypogeans.png"
            alt=""
            height={16}
            width={16}
          />
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
