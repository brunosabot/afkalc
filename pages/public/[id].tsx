import { mdiEarth } from "@mdi/js";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useFirestoreDocument from "../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import useLoadId from "../../components/pages/HeroList/hooks/useLoadId";
import ShareBanner from "../../components/pages/Public/ui/ShareBanner";
import TabElderTree from "../../components/pages/Public/ui/TabElderTree";
import TabHeroes from "../../components/pages/Public/ui/TabHeroes";
import TabKingTower from "../../components/pages/Public/ui/TabKingTower";
import ProfileContext from "../../components/providers/ProfileContext";
import IFirebaseProfile from "../../components/providers/types/IFirebaseProfile";
import Card from "../../components/ui/card/Card";
import CardTab from "../../components/ui/card/CardTab";
import CardTabs from "../../components/ui/card/CardTabs";
import CardTitle from "../../components/ui/card/CardTitle";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "public", "pve", "hero-list"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

// const typedHeroes: ICharacter[] = heroesJson as ICharacter[];

interface IProps {
  [key: string]: never;
}

const PublicId: React.FC<IProps> = function HeroList() {
  const { t } = useTranslation("public");
  // const { t: tC } = useTranslation("common");
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { id } = router.query;
  const [tab, setTab] = useState<number>(0);

  // const [editPopupState, setEditPopupState] = useState(0);
  // const [showModal, setShowModal] = useState(false);
  // const [editPopupCharacters, setEditPopupCharacters] = useState<any[]>([]);
  // const [state, dispatch] = useFilters();

  const userId = useLoadId(id as string);

  const document = useFirestoreDocumentReference(userId ? `profile/${userId}` : undefined);
  const result = useFirestoreDocument<IFirebaseProfile>(document);
  // const heroes = result.data?.heroes || {};
  // const userName = result.data?.playerName;
  const isSelf = userId === values.userId;

  // const setLevel = useSetLevel(document, heroes);
  // const getValue = useGetValue(heroes);

  // const typedHeroesWithName = typedHeroes.map((hero) => ({
  //   ...hero,
  //   name: tC(`heroesName.${hero.slug}`),
  // }));

  // const characters = useFilteredHeroes(typedHeroesWithName, heroes, state);

  // const characterToEdit = useMemo(
  //   () =>
  //     characters.find((c) => c.id === editPopupState) ?? {
  //       id: 0,
  //       si: -1,
  //       fi: 0,
  //       ascend: 0,
  //       engrave: 0,
  //       partbody: 0,
  //       partboots: 0,
  //       parthead: 0,
  //       partweapon: 0,
  //       partbodyfaction: 0,
  //       partbootsfaction: 0,
  //       partheadfaction: 0,
  //       partweaponfaction: 0,
  //       type: Type.agility,
  //       isAwakened: false,
  //     },
  //   [characters, editPopupState]
  // );

  // useEffect(() => {
  //   if (id && id.length < 12 && userId) {
  //     window.location.replace(`/hero-list/${userId}`);
  //   }
  // }, [id, userId]);

  // const lastUpdate = useMemo(
  //   () => dayjs(new Date(result.data?.heroesLastUpdate ?? 0)).fromNow(),
  //   [result.data?.heroesLastUpdate]
  // );

  console.log(result.data);

  return (
    <Card>
      <CardTitle icon={mdiEarth}>{t("title-public")}</CardTitle>
      <CardTabs>
        <CardTab active={tab === 0} onClick={() => setTab(0)}>
          {t("elder-tree")}
        </CardTab>
        <CardTab active={tab === 1} onClick={() => setTab(1)}>
          {t("king-tower")}
        </CardTab>
        <CardTab active={tab === 2} onClick={() => setTab(2)}>
          {t("heroes")}
        </CardTab>
      </CardTabs>

      {isSelf ? <ShareBanner userId={userId} /> : null}

      {tab === 0 ? <TabElderTree elderTree={result.data?.elderTree} isSelf={isSelf} /> : null}
      {tab === 1 ? <TabKingTower pve={result.data?.pve} isSelf={isSelf} /> : null}
      {tab === 2 ? (
        <TabHeroes
          heroes={result.data?.heroes}
          lastUpdate={result.data?.heroesLastUpdate}
          isSelf={isSelf}
        />
      ) : null}
    </Card>
  );
};

export default withLayoutPrivate(PublicId);
