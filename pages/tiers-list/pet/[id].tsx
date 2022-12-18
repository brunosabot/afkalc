import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useFirestoreDocument from "../../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../components/hooks/useFirestoreDocumentReference";
import withLayoutPrivate from "../../../components/layout/withLayoutPrivate";
import PetOwner from "../../../components/pages/TiersList/ui/PetOwner";
import PetViewer from "../../../components/pages/TiersList/ui/PetViewer";
import ProfileContext from "../../../components/providers/ProfileContext";
import IFirebasePetList from "../../../components/providers/types/IFirebasePetList";

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

const PetList: React.FC<IProps> = function PetList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { values } = useContext(ProfileContext);
  const { id } = router.query;

  const document = useFirestoreDocumentReference(`pet-list/${id}`);
  const result = useFirestoreDocument<IFirebasePetList>(document);
  const isOwner = values.userId === result?.data?.ownerId;

  if (
    document === undefined ||
    result.status !== "success" ||
    result.data === undefined ||
    result.data === null
  ) {
    return null;
  }

  const Component = isOwner ? PetOwner : PetViewer;

  return (
    <>
      <Head>
        <title>{`${t("common:menu.pet-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      <Component result={result.data} listId={id as string} />
    </>
  );
};

export default withLayoutPrivate(PetList);
