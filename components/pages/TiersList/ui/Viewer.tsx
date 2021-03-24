import { mdiContentCopy, mdiPlaylistCheck } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useEffect, useMemo, useState } from "react";
import useFirestoreDocument from "../../../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../hooks/useFirestoreDocumentReference";
import IFirebaseHeroes, { IFirebaseHeroList } from "../../../providers/types/IFirebaseHeroes";
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
  const heroes = useMemo(() => heroResult.data?.heroes || [], [heroResult.data?.heroes]);
  const listHeroes = result.heroes.filter((hero) => hero.hero);
  const title = result?.title ?? t("no-name");

  const [initialHeroes, setInitialHeroes] = useState<IFirebaseHeroList>({});
  useEffect(() => {
    if (Object.keys(heroes).length > 0 && Object.keys(initialHeroes).length === 0) {
      setInitialHeroes(JSON.parse(JSON.stringify(heroes)));
    }
  }, [heroes, initialHeroes]);

  const onDuplicateList = useDuplicateList(result);
  const setLevel = useSetLevel(heroDocument, heroes);

  if (heroResult.status !== "success") return null;

  return (
    <>
      <Card>
        <CardTitle
          icon={mdiPlaylistCheck}
          action={<FavoriteButton title={title} listId={listId} />}
        >
          {title}
        </CardTitle>

        {listHeroes.map((hero, index) => (
          <HeroLineViewer
            key={`${hero.hero}-${hero.ascend}-${hero.fi}-${hero.si}`}
            hero={hero}
            setLevel={setLevel}
            heroLevels={heroes[hero.hero]}
            priorityList={result}
            initialHeroLevels={initialHeroes[hero.hero]}
          />
        ))}

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
