import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useFirestoreDocument from "../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import Owner from "../../components/pages/TiersList/ui/Owner";
import Viewer from "../../components/pages/TiersList/ui/Viewer";
import ProfileContext from "../../components/providers/ProfileContext";
import IFirebasePriorityList from "../../components/providers/types/IFirebasePriorityList";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "abex-relic-sell",
      "abex-relic",
      "common",
      "donate",
      "elder-tree",
      "elite-summon",
      "fast-reward",
      "guild",
      "hero-list",
      "item-cost",
      "loot",
      "priority-list",
      "settings",
      "signature-item",
      "top-team",
      "translation",
    ])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

interface IProps {
  [key: string]: never;
}

const TiersList: React.FC<IProps> = function TreeList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { values } = useContext(ProfileContext);
  const { id } = router.query;

  const document = useFirestoreDocumentReference(`priority-list/${id}`);
  const result = useFirestoreDocument<IFirebasePriorityList>(document);
  const isOwner = values.userId === result?.data?.ownerId;

  if (
    document === undefined ||
    result.status !== "success" ||
    result.data === undefined ||
    result.data === null
  ) {
    return null;
  }

  const Component = isOwner ? Owner : Viewer;

  return (
    <>
      <Head>
        <title>{`${t("common:menu.priority-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      <Component result={result.data} listId={id as string} />
    </>
  );
};

export default withLayoutPrivate(TiersList);
