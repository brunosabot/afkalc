import { mdiViewList } from "@mdi/js";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useFirestoreQuery from "../../components/hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../../components/hooks/useUserFirestoreDocument";
import useFilteredHeroes from "../../components/pages/HeroList/hooks/useFilteredHeroes";
import useFilters from "../../components/pages/HeroList/hooks/useFilters";
import useGetValue from "../../components/pages/HeroList/hooks/useGetValue";
import useLoadId from "../../components/pages/HeroList/hooks/useLoadId";
import useSetLevel from "../../components/pages/HeroList/hooks/useSetLevel";
import Filters from "../../components/pages/HeroList/ui/Filters";
import HeroLine from "../../components/pages/HeroList/ui/HeroLine";
import ShareBanner from "../../components/pages/HeroList/ui/ShareBanner";
import TitleLine from "../../components/pages/HeroList/ui/TitleLine";
import UserContext from "../../components/providers/UserContext";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import CheckboxField from "../../components/ui/CheckboxField";
import TwoColsSticky from "../../components/ui/layout/TwoColsSticky";
import heroes from "../../data/heroes.json";
import { useTranslation } from "../../i18n";
import ICharacter from "../../types/ICharacter";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = () => {
  const { t } = useTranslation("hero-list");
  const router = useRouter();
  const { values } = useContext(UserContext);
  const { id } = router.query;
  const isSelf = id === values.shareId;

  const [unlockFi, setUnlockFi] = useState(false);
  const [state, dispatch] = useFilters();

  const userId = useLoadId(id as string);

  const document = useUserFirestoreDocument(userId ? `hero-list/${userId}` : undefined);
  const result = useFirestoreQuery(document);
  const levels = result.data?.levels || [];

  const setLevel = useSetLevel(levels, document);
  const getValue = useGetValue(levels);

  const characters = useFilteredHeroes(typedHeroes, levels, state);

  return (
    <>
      <TwoColsSticky>
        <Card>
          <CardTitle icon={mdiViewList}>{t("common:menu.hero-list")}</CardTitle>

          <ShareBanner isView={isSelf === false} />
          <Head>
            <title>{`${t("common:menu.hero-list")} - Afkalc`}</title>
            <meta name="description" content="" />
          </Head>

          <Filters state={state} dispatch={dispatch} />

          <CheckboxField
            name="unlockFi"
            onChange={setUnlockFi}
            value={unlockFi}
            label={t("label-unlock-fi")}
          />
        </Card>
      </TwoColsSticky>

      <Card>
        <CardTitle icon={mdiViewList}>{t("common:menu.hero-list")}</CardTitle>
        {characters.length === 0 ? (
          <CardHelp>{t("label-empty")}</CardHelp>
        ) : (
          <div style={{ paddingBottom: "16px" }}>
            {characters.map((character, i) => (
              <React.Fragment key={character.id}>
                {character.faction !== characters[i - 1]?.faction ? <TitleLine /> : null}
                <HeroLine
                  id={character.id}
                  name={character.name}
                  setLevel={setLevel}
                  getValue={getValue}
                  isView={isSelf === false}
                  shouldUnlockFi={unlockFi}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </Card>
    </>
  );
};

export default HeroList;
