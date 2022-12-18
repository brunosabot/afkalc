import { mdiContentCopy, mdiDelete, mdiEye, mdiPaw, mdiPlaylistEdit, mdiPlus } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChoosePetStep from "../../../modal/ChoosePetStep";
import PetListContext from "../../../providers/PetListContext";
import IFirebasePetList, { IFirebasePetListStep } from "../../../providers/types/IFirebasePetList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";
import useAdd from "../hooks/useAdd";
import useDelete from "../hooks/useDelete";
import useDown from "../hooks/useDown";
import useDuplicatePetList from "../hooks/useDuplicatePetList";
import useUp from "../hooks/useUp";
import useUpdate from "../hooks/useUpdate";
import Back from "./Back";
import PetShareBanner from "./PetShareBanner";
import PetStepLine from "./PetStepLine";
import PetViewer from "./PetViewer";

interface IProps {
  result: IFirebasePetList;
  listId: string;
}

const PetOwner: React.FC<IProps> = function PetOwner({ listId, result }) {
  const router = useRouter();
  const {
    actions: { deleteList, setSteps, setTitle },
  } = useContext(PetListContext);
  const { t } = useTranslation("priority-list");
  const [isForcedViewer, setIsForcedViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDuplicateList = useDuplicatePetList(result);

  const onDeleteList = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("label-confirm-delete") ?? "")) {
      deleteList(listId).then(() => {
        router.push("/tiers-list");
      });
    }
  }, [deleteList, listId, router, t]);

  const title = result?.title ?? "Unknown";

  const addStep = useAdd<IFirebasePetListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const updateStep = useUpdate<IFirebasePetListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const onUp = useUp<IFirebasePetListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const onDown = useDown<IFirebasePetListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );
  const onDelete = useDelete<IFirebasePetListStep>(result.steps, (newStepes) =>
    setSteps(listId, newStepes)
  );

  const [theNewStep, setTheNewStep] = useState<IFirebasePetListStep>({
    pet: 6001,
    level: 0,
  });

  return (
    <>
      <Back />

      <Card>
        <CardTitle icon={mdiPlaylistEdit}>{t("title-edit")}</CardTitle>
        <PetShareBanner listId={listId} />

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

      {isForcedViewer ? <PetViewer result={result} listId={listId} /> : null}

      {isForcedViewer ? null : (
        <Card>
          <CardTitle icon={mdiPaw}>{title}</CardTitle>

          {result.steps.map((step, i) => (
            <PetStepLine
              onDelete={onDelete}
              onUp={onUp}
              onDown={onDown}
              index={i}
              step={step}
              key={`${step.pet}-${step.level}`}
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
              if (theNewStep.pet !== undefined) {
                addStep(theNewStep);
                setTheNewStep({ pet: 6001, level: 0 });
              }
              setShowModal(false);
            }}
          >
            <ChoosePetStep pet={theNewStep.pet} level={theNewStep.level} onSelect={setTheNewStep} />
          </Modal>
        </Card>
      )}
    </>
  );
};

export default PetOwner;
