import { mdiContentCopy, mdiPlaylistCheck } from "@mdi/js";
import firebase from "firebase/app";
import React from "react";
import { useTranslation } from "../../../../i18n";
import IHeroDetails from "../../../../types/IHeroDetails";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../../../hooks/useUserFirestoreDocument";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import useSetLevel from "../../HeroList/hooks/useSetLevel";
import useDuplicateList from "../hooks/useDuplicateList";
import FavoriteButton from "./FavoriteButton";
import HeroLineViewer from "./HeroLineViewer";

interface IProps {
  document: firebase.firestore.DocumentReference;
  listId: string;
  userId: string;
}

const Viewer: React.FC<IProps> = ({ listId, userId, document }) => {
  const result = useFirestoreQuery(document);
  const heroDocument = useUserFirestoreDocument(`hero-list/%ID%`);
  const heroResult = useFirestoreQuery(heroDocument);
  const { t } = useTranslation("priority-list");
  const levels = heroResult.data?.levels || [];

  const onDuplicateList = useDuplicateList(result.data);

  const setLevel = useSetLevel(levels, heroDocument);

  const heroes: IHeroDetails[] = (result.data?.heroes ?? []).map((hero: IHeroDetails) => {
    if (typeof hero === "number") return { id: hero };
    return hero;
  });
  const title = result.data?.title ?? t("no-name");

  if (result.status !== "success" || heroResult.status !== "success") {
    return null;
  }

  return (
    <>
      <Card>
        <CardTitle
          icon={mdiPlaylistCheck}
          action={<FavoriteButton title={title} listId={listId} userId={userId} />}
        >
          {title}
        </CardTitle>

        {heroes.map((hero: IHeroDetails) => {
          if (hero.id === undefined) return null;

          return (
            <HeroLineViewer
              key={`${hero.id}-${hero.ascend}-${hero.fi}-${hero.si}`}
              hero={hero}
              setLevel={setLevel}
              heroLevels={heroResult.data?.levels[hero.id]}
              priorityList={result.data}
            />
          );
        })}

        <CardActions>
          <CardAction icon={mdiContentCopy} onClick={onDuplicateList}>
            {t("label-duplicate")}
          </CardAction>
        </CardActions>
      </Card>
    </>
  );
};

export default Viewer;
