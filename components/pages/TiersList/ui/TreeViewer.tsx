import { mdiContentCopy, mdiTree } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import React, { useContext, useMemo, useState } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebaseTreeList from "../../../providers/types/IFirebaseTreeList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardHelp from "../../../ui/card/CardHelp";
import CardTitle from "../../../ui/card/CardTitle";
import CardWarn from "../../../ui/card/CardWarn";
import useDuplicateTreeList from "../hooks/useDuplicateTreeList";
import CheckedButton from "./CheckedButton";
import FavoriteTreeButton from "./FavoriteTreeButton";
import TreeLineViewer from "./TreeLineViewer";

interface IProps {
  result: IFirebaseTreeList;
  listId: string;
}

const TreeViewer: React.FC<IProps> = function TreeViewer({ listId, result }) {
  const { values } = useContext(ProfileContext);
  const [showChecked, setShowChecked] = useState<boolean>(false);
  const { t } = useTranslation("priority-list");
  const onDuplicateList = useDuplicateTreeList(result);

  const listSteps = result.steps.filter((step) => step.heroClass);
  const title = result?.title ?? t("no-name");

  const lastUpdate = useMemo(
    () => dayjs(new Date(result?.treeListLastUpdate)).fromNow(),
    [result?.treeListLastUpdate]
  );

  return (
    <Card>
      <CardTitle
        icon={mdiTree}
        action={
          <>
            <CheckedButton showChecked={showChecked} setShowChecked={setShowChecked} />
            <FavoriteTreeButton listId={listId} />
          </>
        }
      >
        {title}
      </CardTitle>
      {result?.treeListLastUpdate !== "" ? (
        <div>
          <CardHelp>{`${t("last-update")} ${lastUpdate}`}</CardHelp>
        </div>
      ) : null}

      {showChecked ? null : <CardWarn>{t("checked-items-hidden")}</CardWarn>}

      {listSteps.map((step) => (
        <TreeLineViewer
          key={`${step.heroClass}-${step.level}`}
          step={step}
          elderTree={values.elderTree}
          shouldShowChecked={showChecked}
        />
      ))}
      <CardActions>
        <CardAction icon={mdiContentCopy} onClick={onDuplicateList}>
          {t("label-duplicate")}
        </CardAction>
      </CardActions>
    </Card>
  );
};

export default TreeViewer;
