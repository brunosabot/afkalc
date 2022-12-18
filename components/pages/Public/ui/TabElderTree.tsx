import { mdiPencil } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IFirebaseElderTree } from "../../../providers/types/IFirebaseElderTree";
import Svg from "../../../ui/Svg";
import classes from "./TabElderTree.module.css";

interface ITabElderTreeProps {
  isSelf: boolean;
  elderTree?: IFirebaseElderTree;
}

const TabElderTree: React.FC<ITabElderTreeProps> = function TabElderTree({ elderTree, isSelf }) {
  const { t } = useTranslation("public");

  return (
    <div className={classes.TabElderTree}>
      <img src="/background/elder-tree.jpeg" className={classes.Background} alt="" />
      {isSelf ? (
        <Link href="/elder-tree" className={classes.Action}>
          <Svg d={mdiPencil} />
        </Link>
      ) : null}
      <div className={classes.Support}>
        <Image
          src="/elder-tree/duras-sustenance.png"
          alt="support"
          className={classes.ClassImage}
          height={80}
          width={80}
        />
        <span className={classes.LevelLabel}>
          {t("label-level")}
          {elderTree?.support}
        </span>
      </div>
      <div className={classes.Mage}>
        <Image
          src="/elder-tree/duras-sorcery.png"
          alt="mage"
          className={classes.ClassImage}
          height={80}
          width={80}
        />
        <span className={classes.LevelLabel}>
          {t("label-level")}
          {elderTree?.mage}
        </span>
      </div>
      <div className={classes.Warrior}>
        <Image
          src="/elder-tree/duras-might.png"
          alt="warrior"
          className={classes.ClassImage}
          height={80}
          width={80}
        />
        <span className={classes.LevelLabel}>
          {t("label-level")}
          {elderTree?.warrior}
        </span>
      </div>
      <div className={classes.Tank}>
        <Image
          src="/elder-tree/duras-fortitude.png"
          alt="tank"
          className={classes.ClassImage}
          height={80}
          width={80}
        />
        <span className={classes.LevelLabel}>
          {t("label-level")}
          {elderTree?.tank}
        </span>
      </div>
      <div className={classes.Ranger}>
        <Image
          src="/elder-tree/duras-celerity.png"
          alt="ranger"
          className={classes.ClassImage}
          height={80}
          width={80}
        />
        <span className={classes.LevelLabel}>
          {t("label-level")}
          {elderTree?.ranger}
        </span>
      </div>
      <div className={classes.Main}>
        <Image
          src="/elder-tree/tree-level.png"
          alt=""
          className={classes.ClassImage}
          height={80}
          width={80}
        />
        <span className={classes.LevelLabel}>
          {t("label-level")}
          {elderTree?.main}
        </span>
      </div>
    </div>
  );
};

export default TabElderTree;
