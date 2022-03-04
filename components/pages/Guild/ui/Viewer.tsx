import { mdiPlaylistCheck } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import useFirestoreDocument from "../../../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../hooks/useFirestoreDocumentReference";
import { IFirebaseHeroList } from "../../../providers/types/IFirebaseHeroes";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Card from "../../../ui/card/Card";
import CardHelp from "../../../ui/card/CardHelp";
import CardTitle from "../../../ui/card/CardTitle";
import CardWarn from "../../../ui/card/CardWarn";
import useSetLevel from "../../TiersList/hooks/useSetLevel";
import CheckedButton from "../../TiersList/ui/CheckedButton";
import HeroLineViewer from "../../TiersList/ui/HeroLineViewer";

interface IProps {
  result: IFirebasePriorityList;
}

const Viewer: React.FC<IProps> = function Viewer({ result }) {
  const [showChecked, setShowChecked] = useState<boolean>(false);
  const router = useRouter();
  const heroDocument = useFirestoreDocumentReference(`profile/${router.query.member}`);
  const heroValues = useFirestoreDocument<IFirebaseProfile>(heroDocument);

  const { t } = useTranslation("priority-list");
  const listHeroes = result.heroes.filter((hero) => hero.hero);
  const title = result?.title ?? t("no-name");

  const heroes = useMemo(() => heroValues.data?.heroes ?? [], [heroValues.data?.heroes]);

  const [initialHeroes, setInitialHeroes] = useState<IFirebaseHeroList>({});
  useEffect(() => {
    if (Object.keys(heroes).length > 0 && Object.keys(initialHeroes).length === 0) {
      setInitialHeroes(JSON.parse(JSON.stringify(heroes)));
    }
  }, [heroes, initialHeroes]);

  const setLevel = useSetLevel(heroDocument, heroes);

  const lastUpdate = useMemo(
    () => dayjs(new Date(result?.priorityListLastUpdate)).fromNow(),
    [result?.priorityListLastUpdate]
  );
  const lastUpdateHeroes = useMemo(
    () => dayjs(new Date(heroValues?.data?.heroesLastUpdate ?? 0)).fromNow(),
    [heroValues?.data?.heroesLastUpdate]
  );

  return (
    <Card>
      <CardTitle
        icon={mdiPlaylistCheck}
        action={<CheckedButton showChecked={showChecked} setShowChecked={setShowChecked} />}
      >
        {title} x {heroValues.data?.playerName}
      </CardTitle>

      {result?.priorityListLastUpdate !== "" ? (
        <div>
          <CardHelp>
            <div>{`${t("last-list-update")} ${lastUpdate}`}</div>
            <div>{`${t("last-heroes-update")} ${lastUpdateHeroes}`}</div>
          </CardHelp>
        </div>
      ) : null}

      {showChecked ? null : <CardWarn>{t("checked-items-hidden")}</CardWarn>}

      {listHeroes.map((hero) => (
        <HeroLineViewer
          key={`${hero.hero}-${hero.ascend}-${hero.fi}-${hero.si}`}
          hero={hero}
          heroLevels={heroes[hero.hero]}
          setLevel={setLevel}
          priorityList={result}
          initialHeroLevels={initialHeroes[hero.hero]}
          shouldShowChecked={showChecked}
          shouldShowSetLevel={false}
        />
      ))}
    </Card>
  );
};

export default Viewer;
