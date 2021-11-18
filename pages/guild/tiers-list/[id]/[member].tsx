import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useFirestoreDocument from "../../../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../../../components/layout/withLayoutPrivate";
import Back from "../../../../components/pages/Guild/ui/Back";
import Viewer from "../../../../components/pages/Guild/ui/Viewer";
import IFirebasePriorityList from "../../../../components/providers/types/IFirebasePriorityList";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "priority-list"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

interface IProps {
  [key: string]: never;
}

const TiersList: React.FC<IProps> = function TiersList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { id } = router.query;

  const document = useFirestoreDocumentReference(`priority-list/${id}`);
  const result = useFirestoreDocument<IFirebasePriorityList>(document);

  if (
    document === undefined ||
    result.status !== "success" ||
    result.data === undefined ||
    result.data === null
  ) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`${t("common:menu.priority-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      <Back id={id as string} />

      <Viewer result={result.data} listId={id as string} />
    </>
  );
};

export default withLayoutPrivate(TiersList);
