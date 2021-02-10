import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useUserFirestoreDocument from "../../../components/hooks/useUserFirestoreDocument";
import useUserId from "../../../components/pages/PriorityList/hooks/useUserId";
import Owner from "../../../components/pages/PriorityList/ui/Owner";
import Viewer from "../../../components/pages/PriorityList/ui/Viewer";
import { FirebaseContext } from "../../../components/providers/FirebaseProvider";
import LoginButton from "../../../components/ui/button/LoginButton";
import Card from "../../../components/ui/card/Card";
import CardTitle from "../../../components/ui/card/CardTitle";
import { useTranslation } from "../../../i18n";

interface IProps {
  [key: string]: never;
}

const PriorityList: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { values } = useContext(FirebaseContext);
  const { user, id } = router.query;
  const [userId, setUserId] = useState("");
  useUserId(user as string, setUserId);

  const isOwner = values.uid === userId;

  const document = useUserFirestoreDocument(
    userId ? `user/${userId}/priority-list/${id}` : undefined
  );

  if (document === undefined) {
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

  return (
    <>
      <Head>
        <title>{`${t("common:menu.priority-list")} - Afkalc`}</title>
        <meta name="description" content="" />
      </Head>

      {isOwner ? (
        <Owner document={document} listId={id as string} userId={user as string} />
      ) : (
        <Viewer document={document} listId={id as string} userId={user as string} />
      )}
    </>
  );
};

export default PriorityList;
