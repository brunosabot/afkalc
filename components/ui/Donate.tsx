import { mdiGift } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import classes from "./Donate.module.css";
import MenuItem from "./menu/MenuItem";

interface IProps {
  [key: string]: never;
}

const Donate: React.FC<IProps> = function Donate() {
  const { t } = useTranslation("common");

  return (
    <MenuItem to="/donate" icon={mdiGift} className={classes.Donate}>
      {t("menu.donate")}
    </MenuItem>
  );
};

export default Donate;
