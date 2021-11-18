import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useFirestoreDocument from "../../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../../components/layout/withLayoutPrivate";
import TreeOwner from "../../../components/pages/TiersList/ui/TreeOwner";
import TreeViewer from "../../../components/pages/TiersList/ui/TreeViewer";
import ProfileContext from "../../../components/providers/ProfileContext";
import IFirebaseTreeList from "../../../components/providers/types/IFirebaseTreeList";

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

const TreeList: React.FC<IProps> = function TreeList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { values } = useContext(ProfileContext);
  const { id } = router.query;

  const document = useFirestoreDocumentReference(`tree-list/${id}`);
  const result = useFirestoreDocument<IFirebaseTreeList>(document);
  const isOwner = values.userId === result?.data?.ownerId;

  if (
    document === undefined ||
    result.status !== "success" ||
    result.data === undefined ||
    result.data === null
  ) {
    return null;
  }

  const Component = isOwner ? TreeOwner : TreeViewer;

  return (
    <>
      <Head>
        <title>{`${t("common:menu.tree-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      <Component result={result.data} listId={id as string} />
    </>
  );
};

export default withLayoutPrivate(TreeList);
