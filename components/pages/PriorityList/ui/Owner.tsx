import {
  mdiContentCopy,
  mdiDelete,
  mdiEye,
  mdiPlaylistCheck,
  mdiPlaylistEdit,
  mdiPlus,
} from "@mdi/js";
import firebase from "firebase";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { useTranslation } from "../../../../i18n";
import IHeroDetails from "../../../../types/IHeroDetails";
import Modal from "../../../functionnal/Modal";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import { FirebaseContext } from "../../../providers/FirebaseProvider";
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
  document: firebase.firestore.DocumentReference;
  listId: string;
  userId: string;
}

const Owner: React.FC<IProps> = ({ listId, userId, document }) => {
  const router = useRouter();
  const { values } = useContext(FirebaseContext);
  const { t } = useTranslation("priority-list");
  const { t: tHero } = useTranslation("hero-list");
  const [isForcedViewer, setIsForcedViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const result = useFirestoreQuery(document);
  const onDuplicateList = useDuplicateList(result.data);

  const heroes: IHeroDetails[] = (result.data?.heroes ?? []).map((hero: IHeroDetails) => {
    if (typeof hero === "number") return { id: hero };
    return hero;
  });
  const setHeroes = useCallback(
    (newHeroes: IHeroDetails[]) => {
      if (document !== undefined) {
        document.update({ heroes: newHeroes }).catch(() =>
          document.set({
            heroes: newHeroes,
            owner: values.uid,
          })
        );
      }
    },
    [document, values.uid]
  );
  const setTitle = useCallback(
    (newTitle: string) => {
      if (document !== undefined) {
        document.update({ title: newTitle }).catch(() =>
          document.set({
            title: newTitle,
            owner: values.uid,
          })
        );
      }
    },
    [document, values.uid]
  );
  const setValue = useCallback(
    (newValue: string) => {
      if (document !== undefined) {
        document.update({ value: newValue }).catch(() =>
          document.set({
            value: parseInt(newValue, 10),
            owner: values.uid,
          })
        );
      }
    },
    [document, values.uid]
  );
  const setType = useCallback(
    (newType: string) => {
      if (document !== undefined) {
        document.update({ type: newType }).catch(() =>
          document.set({
            type: newType,
            owner: values.uid,
          })
        );
      }
    },
    [document, values.uid]
  );
  const onDeleteList = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("label-confirm-delete"))) {
      document?.delete().then(() => {
        router.push("/priority-list");
      });
    }
  }, [document, router, t]);

  const title = result.data?.title ?? "Unknown";
  const value = result.data?.value ?? 0;
  const type = result.data?.type ?? "";

  const addHero = useAdd<IHeroDetails>(heroes, setHeroes);
  const updateHero = useUpdate<IHeroDetails>(heroes, setHeroes);
  const onUp = useUp<IHeroDetails>(heroes, setHeroes);
  const onDown = useDown<IHeroDetails>(heroes, setHeroes);
  const onDelete = useDelete<IHeroDetails>(heroes, setHeroes);

  const [theNewHero, setTheNewHero] = useState<IHeroDetails>({});

  if (result.status !== "success") {
    return null;
  }

  return (
    <>
      <Back />

      <Card>
        <CardTitle icon={mdiPlaylistEdit}>{t("title-edit")}</CardTitle>
        <ShareBanner listId={listId} userId={userId} />

        <InputField label={t("label-list-name")} name="title" value={title} onChange={setTitle} />

        <SelectField
          onChange={setType}
          value={type}
          label={t("label-list-type")}
          name="type"
          values={[
            { key: "", label: t("label-none") },
            { key: "SI", label: t("label-si") },
            { key: "FI", label: t("label-fi") },
            { key: "ASCEND", label: t("label-ascend") },
          ]}
        />

        {type === "ASCEND" ? (
          <SelectField
            label={t("label-value")}
            name="value"
            onChange={setValue}
            value={value}
            values={ascendLevels.map((level) => ({
              key: `${level.key}`,
              label: tHero(`ascension-${level.name}`),
            }))}
          />
        ) : (
          <InputField label={t("label-value")} name="value" value={value} onChange={setValue} />
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

      {isForcedViewer ? <Viewer document={document} listId={listId} userId={userId} /> : null}

      {isForcedViewer ? null : (
        <Card>
          <CardTitle icon={mdiPlaylistCheck}>{title}</CardTitle>

          {heroes.map(
            (hero: IHeroDetails, i: number) => (
              /* eslint-disable react/no-array-index-key */
              <HeroLine
                onDelete={onDelete}
                onUp={onUp}
                onDown={onDown}
                index={i}
                hero={hero}
                key={`${hero.id}-${hero.ascend}-${hero.si}-${hero.fi}`}
                length={heroes.length}
                onSelect={updateHero}
              />
            )
            /* eslint-enable react/no-array-index-key */
          )}

          <CardActions>
            <CardAction icon={mdiContentCopy} onClick={onDuplicateList}>
              {t("label-duplicate")}
            </CardAction>
            <CardAction icon={mdiPlus} onClick={() => setShowModal(true)}>
              Ajouter
            </CardAction>
          </CardActions>

          <Modal
            active={showModal}
            onClose={() => {
              if (theNewHero.id !== undefined && theNewHero.id > 0) {
                addHero(theNewHero);
                setTheNewHero({});
              }
              setShowModal(false);
            }}
          >
            <ChoosePriorityHero
              id={theNewHero.id}
              si={theNewHero.si}
              fi={theNewHero.fi}
              ascend={theNewHero.ascend}
              onSelect={setTheNewHero}
            />
          </Modal>
        </Card>
      )}
    </>
  );
};

export default Owner;
