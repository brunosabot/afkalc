import { mdiContentCopy, mdiPlaylistCheck } from "@mdi/js";
import React from "react";
import { useTranslation } from "../../../../i18n";
import useFirestoreDocument from "../../../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../hooks/useFirestoreDocumentReference";
import IFirebaseHeroes from "../../../providers/types/IFirebaseHeroes";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import useDuplicateList from "../hooks/useDuplicateList";
import useSetLevel from "../hooks/useSetLevel";
import FavoriteButton from "./FavoriteButton";
import HeroLineViewer from "./HeroLineViewer";

interface IProps {
  result: IFirebasePriorityList;
  listId: string;
}

const Viewer: React.FC<IProps> = ({ listId, result }) => {
  const heroDocument = useFirestoreDocumentReference(`heroes/%ID%`);
  const heroResult = useFirestoreDocument<IFirebaseHeroes>(heroDocument);
  const { t } = useTranslation("priority-list");
  const heroes = heroResult.data?.heroes || [];
  const title = result?.title ?? t("no-name");

  const onDuplicateList = useDuplicateList(result);
  const setLevel = useSetLevel(heroDocument, heroes);

  return (
    <>
      <Card>
        <CardTitle
          icon={mdiPlaylistCheck}
          action={<FavoriteButton title={title} listId={listId} />}
        >
          {title}
        </CardTitle>

        {result.heroes.map((hero) => {
          if (hero.hero === undefined) return null;

          return (
            <HeroLineViewer
              key={`${hero.hero}-${hero.ascend}-${hero.fi}-${hero.si}`}
              hero={hero}
              setLevel={setLevel}
              heroLevels={heroResult.data?.heroes[hero.hero]}
              priorityList={result}
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
