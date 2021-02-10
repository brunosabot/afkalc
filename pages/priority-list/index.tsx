import { mdiPlaylistStar } from "@mdi/js";
import { nanoid } from "nanoid";
import React, { useCallback, useContext } from "react";
import useFirestoreList from "../../components/hooks/useFirestoreList";
import useFirestoreQuery from "../../components/hooks/useFirestoreQuery";
import useUserFirestoreCollection from "../../components/hooks/useUserFirestoreCollection";
import useUserFirestoreDocument from "../../components/hooks/useUserFirestoreDocument";
import Create from "../../components/pages/PriorityList/ui/Create";
import ListItem from "../../components/pages/PriorityList/ui/ListItem";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardActions from "../../components/ui/card/CardActions";
import CardSubTitle from "../../components/ui/card/CardSubTitle";
import CardTitle from "../../components/ui/card/CardTitle";
import List from "../../components/ui/list/List";
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
  const favoriteDocument = useUserFirestoreDocument(`user/%ID%/favorite/priority-list`);
  const userDocument = useUserFirestoreDocument(`user/%ID%`);
  const result = useFirestoreList(document);
  const userResult = useFirestoreQuery(userDocument);
  const favoriteResult = useFirestoreQuery(favoriteDocument);

  const onCreate = useCallback(() => {
    document?.doc(nanoid(11)).set({
      title: "Unknown",
      owner: values.uid,
      heroes: [],
    });
  }, [document, values.uid]);

  if (values.isAuth === false) {
    return (
      <Card>
        <CardTitle>{t("common:require-login")}</CardTitle>
        <LoginButton />
      </Card>
    );
  }

  const favorites = Object.entries<string>(favoriteResult?.data ?? {})
    .filter(([key]) => key !== "id")
    .map(([key, value]) => [key.replace("$", "/"), value]);

  const shareId = userResult?.data?.shareId;
  const created: [string, string][] = (result?.data ?? []).map((list: List) => [
    `${shareId}/${list.id}`,
    list.title,
  ]);

  return (
    <Card>
      <CardTitle icon={mdiPlaylistStar}>{t("title-priority-list")}</CardTitle>

      <CardSubTitle>Listes favorites</CardSubTitle>
      <List>
        {favorites.map(([key, value]) => (
          <ListItem href={`/priority-list/${key}`} key={key}>
            {value}
          </ListItem>
        ))}
      </List>

      <CardSubTitle>Listes crées</CardSubTitle>
      <List>
        {created.map(([key, value]) => (
          <ListItem href={`/priority-list/${key}`} key={key}>
            {value}
          </ListItem>
        ))}
      </List>

      <CardActions>
        <Create onClick={onCreate} />
      </CardActions>
    </Card>
  );
};

export default PriorityList;
