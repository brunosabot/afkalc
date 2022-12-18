import { mdiPencil } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { IFirebasePve } from "../../../providers/types/IFirebasePve";
import Svg from "../../../ui/Svg";
import classes from "./TabCampaign.module.css";

interface ITabCampaignProps {
  isSelf: boolean;
  pve?: IFirebasePve;
}

const TabCampaign: React.FC<ITabCampaignProps> = function TabCampaign({ pve, isSelf }) {
  const { t } = useTranslation("pve");

  return (
    <div className={classes.TabCampaign}>
      <img src="/background/bbg_idle_map_27.png" className={classes.Background} alt="" />
      {isSelf ? (
        <Link href="/pve" className={classes.Action}>
          <Svg d={mdiPencil} />
        </Link>
      ) : null}
      <div className={classes.Campaign}>
        <span className={classes.Name}>{t("label-campaign")}</span>
        <span className={classes.Level}>{pve?.campaign}</span>
      </div>
    </div>
  );
};

export default TabCampaign;
