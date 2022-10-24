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
import TabCampaign from "../../components/pages/Public/ui/TabCampaign";
import TabElderTree from "../../components/pages/Public/ui/TabElderTree";
import TabHeroes from "../../components/pages/Public/ui/TabHeroes";
import TabKingTower from "../../components/pages/Public/ui/TabKingTower";
import TabPets from "../../components/pages/Public/ui/TabPets";
import TabResonatingCrystal from "../../components/pages/Public/ui/TabResonatingCrystal";
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

interface IProps {
  [key: string]: never;
}

const PublicId: React.FC<IProps> = function HeroList() {
  const { t } = useTranslation("public");
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { id } = router.query;
  const [tab, setTab] = useState<number>(0);

  const userId = useLoadId(id as string);

  const document = useFirestoreDocumentReference(userId ? `profile/${userId}` : undefined);
  const result = useFirestoreDocument<IFirebaseProfile>(document);
  const isSelf = userId === values.userId;

  return (
    <Card>
      <CardTitle icon={mdiEarth}>
        {t("title-public")} - {result.data?.playerName}
      </CardTitle>
      <CardTabs>
        <CardTab active={tab === 0} onClick={() => setTab(0)}>
          {t("heroes")}
        </CardTab>
        <CardTab active={tab === 1} onClick={() => setTab(1)}>
          {t("elder-tree")}
        </CardTab>
        <CardTab active={tab === 2} onClick={() => setTab(2)}>
          {t("king-tower")}
        </CardTab>
        <CardTab active={tab === 3} onClick={() => setTab(3)}>
          {t("campaign")}
        </CardTab>
        <CardTab active={tab === 4} onClick={() => setTab(4)}>
          {t("resonating-crystal")}
        </CardTab>
        <CardTab active={tab === 5} onClick={() => setTab(5)}>
          {t("pets")}
        </CardTab>
      </CardTabs>

      {isSelf ? <ShareBanner userId={userId} /> : null}

      {tab === 0 ? (
        <TabHeroes
          heroes={result.data?.heroes}
          lastUpdate={result.data?.heroesLastUpdate}
          isSelf={isSelf}
        />
      ) : null}
      {tab === 1 ? <TabElderTree elderTree={result.data?.elderTree} isSelf={isSelf} /> : null}
      {tab === 2 ? <TabKingTower pve={result.data?.pve} isSelf={isSelf} /> : null}
      {tab === 3 ? <TabCampaign pve={result.data?.pve} isSelf={isSelf} /> : null}
      {tab === 4 ? <TabResonatingCrystal pve={result.data?.pve} isSelf={isSelf} /> : null}
      {tab === 5 ? <TabPets pets={result.data?.pets} /> : null}
    </Card>
  );
};

export default withLayoutPrivate(PublicId);
