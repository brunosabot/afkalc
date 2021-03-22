import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useFirestoreDocument from "../../components/hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../components/hooks/useFirestoreDocumentReference";
import Owner from "../../components/pages/TiersList/ui/Owner";
import Viewer from "../../components/pages/TiersList/ui/Viewer";
import ProfileContext from "../../components/providers/ProfileContext";
import IFirebasePriorityList from "../../components/providers/types/IFirebasePriorityList";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import { useTranslation } from "../../i18n";

interface IProps {
  [key: string]: never;
}

const TiersList: React.FC<IProps> = () => {
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

  if (values.isAuth === false) {
    return (
      <Card>
        <CardTitle>{t("common:require-login")}</CardTitle>
        <LoginButton />
      </Card>
    );
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

export default TiersList;
