import { mdiDelete, mdiEye, mdiPlaylistCheck, mdiPlaylistEdit, mdiPlus } from "@mdi/js";
import firebase from "firebase";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "../../../../i18n";
import Modal from "../../../functionnal/Modal";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import ChooseHero from "../../../modal/ChooseHero";
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
  const [isForcedViewer, setIsForcedViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const result = useFirestoreQuery(document);

  const heroes = result.data?.heroes ?? [];
  const setHeroes = useCallback(
    (newHeroes: number[]) => {
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
    document?.delete().then(() => {
      router.push("/priority-list");
    });
  }, [document, router]);

  const title = result.data?.title ?? "Unknown";
  const value = result.data?.value ?? 0;
  const type = result.data?.type ?? "";

  const addHero = useAdd(heroes, setHeroes);
  const updateHero = useUpdate(heroes, setHeroes);
  const onUp = useUp(heroes, setHeroes);
  const onDown = useDown(heroes, setHeroes);
  const onDelete = useDelete(heroes, setHeroes);

  if (result.status !== "success") {
    return null;
  }

  return (
    <>
      <Back />

      <Card>
        <CardTitle icon={mdiPlaylistEdit}>
          {t("title-edit")}
        </CardTitle>
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
          ]}
        />

        <InputField label={t("label-value")} name="value" value={value} onChange={setValue} />

        <CardActions>
          <CardAction icon={mdiDelete} onClick={onDeleteList}>{t("label-delete")}</CardAction>
          <CardAction icon={mdiEye} onClick={()=>setIsForcedViewer(!isForcedViewer)}>{isForcedViewer ? t("label-edit") : t("label-preview")}</CardAction>
        </CardActions>

      </Card>

      {isForcedViewer ? <Viewer document={document} listId={listId} userId={userId} /> : null}
          
      {isForcedViewer ? null : (
        <Card>
          <CardTitle icon={mdiPlaylistCheck}>
            {title}
          </CardTitle>

          {heroes.map((hero: number, i: number) => (
            /* eslint-disable react/no-array-index-key */
            <HeroLine
              onDelete={onDelete}
              onUp={onUp}
              onDown={onDown}
              index={i}
              hero={hero}
              key={`${hero}-${i}`}
              length={heroes.length}
              onSelect={updateHero}
            />
          )
          /* eslint-enable react/no-array-index-key */
          )}

          <CardActions>
            <CardAction icon={mdiPlus} onClick={()=>setShowModal(true)}>Ajouter</CardAction>
          </CardActions>

          <Modal active={showModal} onClose={() => setShowModal(false)}>
            <ChooseHero
              onlyHero
              current={[]}
              onSelect={(_, heroId) => {
              addHero(heroId);
              setShowModal(false);
            }}
            />
          </Modal>
        </Card>
)}
    </>
  );
};

export default Owner;
