import { mdiAccountSupervisor, mdiContentCopy, mdiPlaylistCheck } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import useFirestoreDocumentReference from "../../../hooks/useFirestoreDocumentReference";
import ProfileContext from "../../../providers/ProfileContext";
import { IFirebaseHeroList } from "../../../providers/types/IFirebaseHeroes";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardHelp from "../../../ui/card/CardHelp";
import CardTitle from "../../../ui/card/CardTitle";
import CardWarn from "../../../ui/card/CardWarn";
import useDuplicateList from "../hooks/useDuplicateList";
import useSetLevel from "../hooks/useSetLevel";
import CheckedButton from "./CheckedButton";
import FavoriteButton from "./FavoriteButton";
import HeroLineViewer from "./HeroLineViewer";

interface IProps {
  result: IFirebasePriorityList;
  listId: string;
}

const Viewer: React.FC<IProps> = function Viewer({ listId, result }) {
  const router = useRouter();
  const [showChecked, setShowChecked] = useState<boolean>(false);
  const heroDocument = useFirestoreDocumentReference(`profile/%ID%`);
  const { values } = useContext(ProfileContext);

  const { t } = useTranslation("priority-list");
  const listHeroes = result.heroes.filter((hero) => hero.hero);
  const title = result?.title ?? t("no-name");

  const [initialHeroes, setInitialHeroes] = useState<IFirebaseHeroList>({});
  useEffect(() => {
    if (Object.keys(values.heroes).length > 0 && Object.keys(initialHeroes).length === 0) {
      setInitialHeroes(JSON.parse(JSON.stringify(values.heroes)));
    }
  }, [values.heroes, initialHeroes]);

  const onDuplicateList = useDuplicateList(result);
  const setLevel = useSetLevel(heroDocument, values.heroes);

  const lastUpdate = useMemo(
    () => dayjs(new Date(result?.priorityListLastUpdate)).fromNow(),
    [result?.priorityListLastUpdate]
  );

  return (
    <Card>
      <CardTitle
        icon={mdiPlaylistCheck}
        action={
          <>
            <CheckedButton showChecked={showChecked} setShowChecked={setShowChecked} />
            <FavoriteButton listId={listId} />
          </>
        }
      >
        {title}
      </CardTitle>

      {result?.priorityListLastUpdate !== "" ? (
        <div>
          <CardHelp>{`${t("last-update")} ${lastUpdate}`}</CardHelp>
        </div>
      ) : null}

      {showChecked ? null : <CardWarn>{t("checked-items-hidden")}</CardWarn>}

      {listHeroes.map((hero) => (
        <HeroLineViewer
          key={`${hero.hero}-${hero.ascend}-${hero.fi}-${hero.si}`}
          hero={hero}
          setLevel={setLevel}
          heroLevels={values.heroes[hero.hero]}
          priorityList={result}
          initialHeroLevels={initialHeroes[hero.hero]}
          shouldShowChecked={showChecked}
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
      </CardActions>
    </Card>
  );
};

export default Viewer;
