import { mdiGift } from "@mdi/js";
import React from "react";
import classes from "./Donate.module.css";
import MenuItem from "./menu/MenuItem";

interface IProps {
  [key: string]: never;
}

const Donate: React.FC<IProps> = function Donate() {
  return (
    <MenuItem to="/donate" icon={mdiGift} className={classes.Donate}>
      Donate
    </MenuItem>
  );
};

export default Donate;
