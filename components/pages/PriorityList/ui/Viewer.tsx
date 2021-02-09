import firebase from "firebase";
import React from "react";
import { useTranslation } from "../../../../i18n";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../../../hooks/useUserFirestoreDocument";
import Character from "../../../ui/afk/Character";
import CardTitle from "../../../ui/card/CardTitle";
import useHero from "../hooks/useHero";
import styles from "./Viewer.module.css";

interface IProps {
  document: firebase.firestore.DocumentReference;
}

const Viewer: React.FC<IProps> = ({document}) => {
  const { getHero } = useHero();
  const result = useFirestoreQuery(document);
  const heroDocument = useUserFirestoreDocument(`hero-list/%ID%`);
  const heroResult = useFirestoreQuery(heroDocument);
  const { t } = useTranslation("priority-list");

  if (result.status !== "success" || heroResult.status !== "success") {
    return null;
  }

  const heroes = result.data?.heroes ?? [];
  const title = result.data?.title ?? t("no-name");

  return (
    <>
      <CardTitle>{title}</CardTitle>

      {heroes.map((hero:number) => {
        const { id, name } = getHero(hero) ?? { id: 0, name: "" };

        const isOk = heroResult.data.levels[hero] && (
          result.data.type === "SI" && result.data.value <= heroResult.data.levels[hero].si ||
          result.data.type === "FI" && result.data.value <= heroResult.data.levels[hero].inn
        )
        
        return(
          <div key={id} className={`${styles.Item} ${isOk?styles.IsOk:""}`}>
            <Character name={name} />
            {name}
          </div>
        )})}
    </>
  );
};

export default Viewer;
