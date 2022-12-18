import { mdiContentCopy, mdiDelete, mdiEye, mdiPlaylistEdit, mdiPlus, mdiTree } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import HeroClass from "../../../../types/HeroClass";
import Modal from "../../../functionnal/Modal";
import ChooseTreeStep from "../../../modal/ChooseTreeStep";
import TreeListContext from "../../../providers/TreeListContext";
import IFirebaseTreeList, {
  IFirebaseTreeListStep,
} from "../../../providers/types/IFirebaseTreeList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";
import useAdd from "../hooks/useAdd";
import useDelete from "../hooks/useDelete";
import useDown from "../hooks/useDown";
import useDuplicateTreeList from "../hooks/useDuplicateTreeList";
import useUp from "../hooks/useUp";
import useUpdate from "../hooks/useUpdate";
import Back from "./Back";
import StepLine from "./StepLine";
import TreeShareBanner from "./TreeShareBanner";
import TreeViewer from "./TreeViewer";

interface IProps {
  result: IFirebaseTreeList;
  listId: string;
}

const TreeOwner: React.FC<IProps> = function TreeOwner({ listId, result }) {
  const router = useRouter();
  const {
    actions: { deleteList, setSteps, setTitle },
  } = useContext(TreeListContext);
  const { t } = useTranslation("priority-list");
  const [isForcedViewer, setIsForcedViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDuplicateList = useDuplicateTreeList(result);

  const onDeleteList = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("label-confirm-delete") ?? "")) {
      deleteList(listId).then(() => {
        router.push("/tiers-list");
      });
    }
  }, [deleteList, listId, router, t]);

  const title = result?.title ?? "Unknown";

  const addStep = useAdd<IFirebaseTreeListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const updateStep = useUpdate<IFirebaseTreeListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const onUp = useUp<IFirebaseTreeListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const onDown = useDown<IFirebaseTreeListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const onDelete = useDelete<IFirebaseTreeListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );

  const [theNewStep, setTheNewStep] = useState<IFirebaseTreeListStep>({
    heroClass: HeroClass.ranger,
    level: 0,
  });

  return (
    <>
      <Back />

      <Card>
        <CardTitle icon={mdiPlaylistEdit}>{t("title-edit")}</CardTitle>
        <TreeShareBanner listId={listId} />

        <InputField
          label={t("label-list-name")}
          name="title"
          value={title}
          onChange={(newTitle) => {
            setTitle(listId, newTitle);
          }}
        />

        <CardActions>
          <CardAction icon={mdiDelete} onClick={onDeleteList}>
            {t("label-delete")}
          </CardAction>
          <CardAction icon={mdiEye} onClick={() => setIsForcedViewer(!isForcedViewer)}>
            {isForcedViewer ? t("label-edit") : t("label-preview")}
          </CardAction>
        </CardActions>
      </Card>

      {isForcedViewer ? <TreeViewer result={result} listId={listId} /> : null}

      {isForcedViewer ? null : (
        <Card>
          <CardTitle icon={mdiTree}>{title}</CardTitle>

          {result.steps.map((step, i) => (
            <StepLine
              onDelete={onDelete}
              onUp={onUp}
              onDown={onDown}
              index={i}
              step={step}
              key={`${step.heroClass}-${step.level}`}
              length={result.steps.length}
              onSelect={updateStep}
            />
          ))}

          <CardActions>
            <CardAction icon={mdiContentCopy} onClick={onDuplicateList}>
              {t("label-duplicate")}
            </CardAction>
            <CardAction icon={mdiPlus} onClick={() => setShowModal(true)}>
              {t("common:add")}
            </CardAction>
          </CardActions>

          <Modal
            active={showModal}
            onClose={() => {
              if (theNewStep.heroClass !== undefined) {
                addStep(theNewStep);
                setTheNewStep({ heroClass: HeroClass.ranger, level: 0 });
              }
              setShowModal(false);
            }}
          >
            <ChooseTreeStep
              heroClass={theNewStep.heroClass}
              level={theNewStep.level}
              onSelect={setTheNewStep}
            />
          </Modal>
        </Card>
      )}
    </>
  );
};

export default TreeOwner;
