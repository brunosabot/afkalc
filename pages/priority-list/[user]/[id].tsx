import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useUserFirestoreDocument from "../../../components/hooks/useUserFirestoreDocument";
import useUserId from "../../../components/pages/PriorityList/hooks/useUserId";
import Owner from "../../../components/pages/PriorityList/ui/Owner";
import Preview from "../../../components/pages/PriorityList/ui/Preview";
import Viewer from "../../../components/pages/PriorityList/ui/Viewer";
import { FirebaseContext } from "../../../components/providers/FirebaseProvider";
import Card from "../../../components/ui/card/Card";
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
  const [isForcedViewer, setIsForcedViewer] = useState(false);
  useUserId(user as string, setUserId);

  const isOwner = values.uid === userId;

  const document = useUserFirestoreDocument(userId ? `user/${userId}/priority-list/${id}`:undefined);

  if (document === undefined) {
    return null;
  }

  return (
    <Card>
      <div style={{ padding: "0 0 16px 0" }}>
        <Head>
          <title>{`${t("common:menu.priority-list")} - Afkalc`}</title>
          <meta name="description" content="" />
        </Head>

        {isOwner && isForcedViewer === false ? <Owner document={document} listId={id as string} userId={user as string} /> : <Viewer document={document} />}

        {isOwner ? <Preview onClick={() => {setIsForcedViewer(!isForcedViewer)}}>{isForcedViewer?t("label-edit"):t("label-preview")}</Preview>:null}
      </div>
    </Card>
  );
};

export default PriorityList;
