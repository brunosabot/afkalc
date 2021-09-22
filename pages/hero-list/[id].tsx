import { mdiViewList } from "@mdi/js";
import dayjs from "dayjs";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from "../../components/functionnal/Modal";
import useFirestoreDocument from "../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import EditHero from "../../components/modal/EditHero";
import useFilteredHeroes from "../../components/pages/HeroList/hooks/useFilteredHeroes";
import useFilters from "../../components/pages/HeroList/hooks/useFilters";
import useGetValue from "../../components/pages/HeroList/hooks/useGetValue";
import useLoadId from "../../components/pages/HeroList/hooks/useLoadId";
import Filters from "../../components/pages/HeroList/ui/Filters";
import HeroLine from "../../components/pages/HeroList/ui/HeroLine";
import ShareBanner from "../../components/pages/HeroList/ui/ShareBanner";
import useSetLevel from "../../components/pages/TiersList/hooks/useSetLevel";
import ProfileContext from "../../components/providers/ProfileContext";
import IFirebaseProfile from "../../components/providers/types/IFirebaseProfile";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import CharacterGrid from "../../components/ui/CharacterGrid";
import CheckboxField from "../../components/ui/CheckboxField";
import TwoColsSticky from "../../components/ui/layout/TwoColsSticky";
import heroesJson from "../../data/heroes.json";
import ICharacter from "../../types/ICharacter";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "hero-list"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

const typedHeroes: ICharacter[] = heroesJson as ICharacter[];

interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = () => {
  const { t } = useTranslation("hero-list");
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { id } = router.query;

  const [unlockFi, setUnlockFi] = useState(false);
  const [editPopupState, setEditPopupState] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useFilters();

  const userId = useLoadId(id as string);

  const document = useFirestoreDocumentReference(userId ? `profile/${userId}` : undefined);
  const result = useFirestoreDocument<IFirebaseProfile>(document);
  const heroes = result.data?.heroes || [];
  const userName = result.data?.playerName;
  const isSelf = userId === values.userId;

  const setLevel = useSetLevel(document, heroes);
  const getValue = useGetValue(heroes);

  const characters = useFilteredHeroes(typedHeroes, heroes, state);

  const characterToEdit = useMemo(
    () =>
      characters.find((c) => c.id === editPopupState) ?? {
        id: 0,
        si: -1,
        fi: 0,
        ascend: 0,
        engrave: 0,
      },
    [characters, editPopupState]
  );

  useEffect(() => {
    if (id && id.length < 12 && userId) {
      window.location.replace(`/hero-list/${userId}`);
    }
  }, [id, userId]);

  const lastUpdate = useMemo(() => dayjs(new Date(result.data?.heroesLastUpdate ?? 0)).fromNow(), [
    result.data?.heroesLastUpdate,
  ]);

  return (
    <>
      <TwoColsSticky>
        <Card>
          <CardTitle icon={mdiViewList}>
            {t(userName ? "hero-list-of" : "hero-list-of-unknown", { userName })}
            {result.data?.campaignLevel ? ` (${result.data?.campaignLevel})` : null}
          </CardTitle>

          {result.data?.heroesLastUpdate !== undefined ? (
            <div style={{ marginBottom: "-16px" }}>
              <CardHelp>{`${t("last-update")} ${lastUpdate}`}</CardHelp>
            </div>
          ) : null}

          <ShareBanner />
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
        <CardTitle icon={mdiViewList}>
          {t(userName ? "hero-list-of" : "hero-list-of-unknown", { userName })}&nbsp;(
          {characters.length})
        </CardTitle>
        {characters.length === 0 ? (
          <CardHelp>{t("label-empty")}</CardHelp>
        ) : (
          <CharacterGrid size="large">
            {characters.map((character, i) => (
              <HeroLine
                id={character.id}
                name={character.name}
                setLevel={setLevel}
                getValue={getValue}
                isView={isSelf === false}
                faction={character.faction}
                link={character.link}
                linkKey={character.linkkey}
                shouldUnlockFi={unlockFi}
                onClick={() => {
                  setEditPopupState(character.id);
                  setShowModal(true);
                  return undefined;
                }}
              />
            ))}
          </CharacterGrid>
        )}
      </Card>

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <EditHero
          hero={characterToEdit.id}
          si={characterToEdit.si}
          fi={characterToEdit.fi}
          ascend={characterToEdit.ascend}
          engrave={characterToEdit.engrave}
          setLevel={setLevel}
          onNext={() => {
            const index = characters.findIndex((c) => c.id === editPopupState);
            setEditPopupState(
              index >= characters.length - 1 ? characters[0].id : characters[index + 1].id
            );
          }}
          onPrev={() => {
            const index = characters.findIndex((c) => c.id === editPopupState);
            setEditPopupState(
              index < 1 ? characters[characters.length - 1].id : characters[index - 1].id
            );
          }}
        />
      </Modal>
    </>
  );
};

export default withLayoutPrivate(HeroList);
