import { mdiPencil } from "@mdi/js";
import { useTranslation } from "next-i18next";
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
      {isSelf ? (
        <Link href="/elder-tree">
          <a className={classes.Action}>
            <Svg d={mdiPencil} />
          </a>
        </Link>
      ) : null}
      <div className={classes.Support}>
        <img src="/elder-tree/duras-sustenance.png" alt="support" className={classes.ClassImage} />
        <span className={classes.Level}>
          {t("label-level")}
          {elderTree?.support}
        </span>
      </div>
      <div className={classes.Mage}>
        <img src="/elder-tree/duras-sorcery.png" alt="mage" className={classes.ClassImage} />
        <span className={classes.Level}>
          {t("label-level")}
          {elderTree?.mage}
        </span>
      </div>
      <div className={classes.Warrior}>
        <img src="/elder-tree/duras-might.png" alt="warrior" className={classes.ClassImage} />
        <span className={classes.Level}>
          {t("label-level")}
          {elderTree?.warrior}
        </span>
      </div>
      <div className={classes.Tank}>
        <img src="/elder-tree/duras-fortitude.png" alt="tank" className={classes.ClassImage} />
        <span className={classes.Level}>
          {t("label-level")}
          {elderTree?.tank}
        </span>
      </div>
      <div className={classes.Ranger}>
        <img src="/elder-tree/duras-celerity.png" alt="ranger" className={classes.ClassImage} />
        <span className={classes.Level}>
          {t("label-level")}
          {elderTree?.ranger}
        </span>
      </div>
      <div className={classes.Main}>
        <img src="/elder-tree/tree-level.png" alt="" className={classes.ClassImage} />
        <span className={classes.Level}>
          {t("label-level")}
          {elderTree?.main}
        </span>
      </div>
    </div>
  );
};

export default TabElderTree;
