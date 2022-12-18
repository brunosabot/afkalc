import {
  mdiAccountSupervisor,
  mdiContentCopy,
  mdiDelete,
  mdiEye,
  mdiPlaylistCheck,
  mdiPlaylistEdit,
  mdiPlus,
} from "@mdi/js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import PriorityListContext from "../../../providers/PriorityListContext";
import IFirebasePriorityList, {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement,
} from "../../../providers/types/IFirebasePriorityList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";
import SelectField from "../../../ui/SelectField";
import useAdd from "../hooks/useAdd";
import useDelete from "../hooks/useDelete";
import useDown from "../hooks/useDown";
import useDuplicateList from "../hooks/useDuplicateList";
import useUp from "../hooks/useUp";
import useUpdate from "../hooks/useUpdate";
import Back from "./Back";
import HeroLine from "./HeroLine";
import ShareBanner from "./ShareBanner";
import Viewer from "./Viewer";

interface IProps {
  result: IFirebasePriorityList;
  listId: string;
}

const Owner: React.FC<IProps> = function Owner({ listId, result }) {
  const router = useRouter();
  const {
    actions: { deleteList, setHeroes, setTitle, setRequirementValue, setRequirement },
  } = useContext(PriorityListContext);
  const { t } = useTranslation("priority-list");
  const [isForcedViewer, setIsForcedViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDuplicateList = useDuplicateList(result);

  const onDeleteList = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("label-confirm-delete") ?? "")) {
      deleteList(listId).then(() => {
        router.push("/tiers-list");
      });
    }
  }, [deleteList, listId, router, t]);

  const title = result?.title ?? "Unknown";
  const requirementValue = result?.requirementValue ?? 0;
  const requirement = result?.requirement ?? "";

  const addHero = useAdd<IFirebasePriorityListHero>(result.heroes, (newHeroes) =>
    setHeroes(listId, newHeroes)
  );
  const updateHero = useUpdate<IFirebasePriorityListHero>(result.heroes, (newHeroes) =>
    setHeroes(listId, newHeroes)
  );
  const onUp = useUp<IFirebasePriorityListHero>(result.heroes, (newHeroes) =>
    setHeroes(listId, newHeroes)
  );
  const onDown = useDown<IFirebasePriorityListHero>(result.heroes, (newHeroes) =>
    setHeroes(listId, newHeroes)
  );
  const onDelete = useDelete<IFirebasePriorityListHero>(result.heroes, (newHeroes) =>
    setHeroes(listId, newHeroes)
  );

  const [theNewHero, setTheNewHero] = useState<IFirebasePriorityListHero>({
    hero: 0,
    si: -1,
    fi: 0,
    ascend: 0,
    engrave: 0,
  });

  return (
    <>
      <Back />

      <Card>
        <CardTitle icon={mdiPlaylistEdit}>{t("title-edit")}</CardTitle>
        <ShareBanner listId={listId} />

        <InputField
          label={t("label-list-name")}
          name="title"
          value={title}
          onChange={(newTitle) => {
            setTitle(listId, newTitle);
          }}
        />

        <SelectField
          onChange={(newRequirement: string) => {
            const r = newRequirement as IFirebasePriorityListRequirement;
            setRequirement(listId, r);
          }}
          value={requirement}
          label={t("label-list-type")}
          name="type"
          values={[
            { key: "", label: t("label-none") },
            { key: "SI", label: t("common:concept.si") },
            { key: "FI", label: t("common:concept.fi") },
            { key: "ASCEND", label: t("common:concept.ascend") },
            { key: "ENGRAVE", label: t("common:concept.engrave") },
          ]}
        />

        {requirement === "ASCEND" ? (
          <SelectField
            label={t("label-value")}
            name="requirementValue"
            onChange={(newValue) => setRequirementValue(listId, parseFloat(newValue || "0"))}
            value={requirementValue}
            values={ascendLevels.map((level) => ({
              key: `${level.key}`,
              label: t(`common:ascension-${level.name}`),
            }))}
          />
        ) : (
          <InputField
            label={t("label-value")}
            name="requirementValue"
            value={requirementValue}
            onChange={(newValue) => setRequirementValue(listId, parseFloat(newValue || "0"))}
          />
        )}

        <CardActions>
          <CardAction icon={mdiDelete} onClick={onDeleteList}>
            {t("label-delete")}
          </CardAction>
          <CardAction icon={mdiEye} onClick={() => setIsForcedViewer(!isForcedViewer)}>
            {isForcedViewer ? t("label-edit") : t("label-preview")}
          </CardAction>
        </CardActions>
      </Card>

      {isForcedViewer ? <Viewer result={result} listId={listId} /> : null}

      {isForcedViewer ? null : (
        <Card>
          <CardTitle icon={mdiPlaylistCheck}>{title}</CardTitle>

          {result.heroes.map((hero, i) => (
            <HeroLine
              onDelete={onDelete}
              onUp={onUp}
              onDown={onDown}
              index={i}
              hero={hero}
              key={`${hero.hero}-${hero.ascend}-${hero.si}-${hero.fi}`}
              length={result.heroes.length}
              onSelect={updateHero}
              requirement={requirement}
              requirementValue={requirementValue}
            />
          ))}

          <CardActions>
            <CardAction icon={mdiContentCopy} onClick={onDuplicateList}>
              {t("label-duplicate")}
            </CardAction>
            <CardAction
              icon={mdiAccountSupervisor}
              onClick={() => router.push(`/guild/tiers-list/${router.query.id}`)}
            >
              {t("label-see-guild")}
            </CardAction>
            <CardAction icon={mdiPlus} onClick={() => setShowModal(true)}>
              {t("common:add")}
            </CardAction>
          </CardActions>

          <Modal
            active={showModal}
            onClose={() => {
              if (theNewHero.hero !== undefined && theNewHero.hero > 0) {
                addHero(theNewHero);
                setTheNewHero({ hero: 0, si: -1, fi: 0, ascend: 0, engrave: 0 });
              }
              setShowModal(false);
            }}
          >
            <ChoosePriorityHero
              hero={theNewHero.hero}
              si={theNewHero.si}
              fi={theNewHero.fi}
              ascend={theNewHero.ascend}
              engrave={theNewHero.engrave}
              onSelect={setTheNewHero}
            />
          </Modal>
        </Card>
      )}
    </>
  );
};

export default Owner;
