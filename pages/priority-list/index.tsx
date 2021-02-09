import { nanoid } from "nanoid";
import React, { useCallback, useContext } from "react";
import useFirestoreList from "../../components/hooks/useFirestoreList";
import useFirestoreQuery from "../../components/hooks/useFirestoreQuery";
import useUserFirestoreCollection from "../../components/hooks/useUserFirestoreCollection";
import useUserFirestoreDocument from "../../components/hooks/useUserFirestoreDocument";
import Create from "../../components/pages/PriorityList/ui/Create";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import { useTranslation } from "../../i18n";

interface IProps {
  [key: string]: never;
}

interface List {
  owner: string;
  heroes: number[];
  id: string;
  title: string;
}

const PriorityList: React.FC<IProps> = () => {
  const { values } = useContext(FirebaseContext);
  const { t } = useTranslation("priority-list");
  const document = useUserFirestoreCollection(`user/%ID%/priority-list`);
  const userDocument = useUserFirestoreDocument(`user/%ID%`);
  const result = useFirestoreList(document);
  const userResult = useFirestoreQuery(userDocument);

  const onCreate = useCallback(() => {
    document?.doc(nanoid(11)).set({
      title: "Unknown",
      owner: values.uid,
      heroes: []
    });
  }, [document, values.uid])

  return (
    <Card>
      <CardTitle>
        {t("title-priority-list")}
      </CardTitle>
      {result?.data?.map((list:List) => (
        <a href={`/priority-list/${userResult?.data?.shareId}/${list.id}`} key={list.id} style={{padding: "16px", display: "block"}}>
          {list.title}
        </a>
      ))}
        
      <Create onClick={onCreate} />
    </Card>
  );
};

export default PriorityList;
