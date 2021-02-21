import { mdiPlaylistStar } from "@mdi/js";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React, { useCallback, useContext } from "react";
import useFirestoreList from "../../components/hooks/useFirestoreList";
import useFirestoreQuery from "../../components/hooks/useFirestoreQuery";
import useUserFirestoreCollection from "../../components/hooks/useUserFirestoreCollection";
import useUserFirestoreDocument from "../../components/hooks/useUserFirestoreDocument";
import Create from "../../components/pages/PriorityList/ui/Create";
import ListItem from "../../components/pages/PriorityList/ui/ListItem";
import ListItemEmpty from "../../components/pages/PriorityList/ui/ListItemEmpty";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import UserContext from "../../components/providers/UserContext";
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

interface IList {
  owner: string;
  heroes: number[];
  id: string;
  title: string;
}

const PriorityList: React.FC<IProps> = () => {
  const router = useRouter();
  const { values } = useContext(FirebaseContext);
  const { values: userValues } = useContext(UserContext);
  const { t } = useTranslation("priority-list");
  const document = useUserFirestoreCollection(`user/%ID%/priority-list`);
  const favoriteDocument = useUserFirestoreDocument(`user/%ID%/favorite/priority-list`);
  const userDocument = useUserFirestoreDocument(`user/%ID%`);
  const result = useFirestoreList(document);
  const userResult = useFirestoreQuery(userDocument);
  const favoriteResult = useFirestoreQuery(favoriteDocument);

  const onCreate = useCallback(() => {
    const id = nanoid(11);

    document?.doc(id).set({
      title: "Unknown",
      owner: values.uid,
      heroes: [],
    });

    router.push(`/priority-list/${userValues.shareId}/${id}`);
  }, [document, router, userValues.shareId, values.uid]);

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
    .map<[string, string]>(([key, value]) => [key.replace("$", "/"), value])
    .concat()
    .sort((a, b) => a[1].localeCompare(b[1]));

  const shareId = userResult?.data?.shareId;
  const createdData: IList[] = result?.data ?? [];
  const created = createdData
    .map<[string, string]>((list) => [`${shareId}/${list.id}`, list.title])
    .concat()
    .sort((a, b) => a[1].localeCompare(b[1]));

  return (
    <Card>
      <CardTitle icon={mdiPlaylistStar}>{t("title-priority-list")}</CardTitle>

      <CardSubTitle>Listes favorites</CardSubTitle>
      <List>
        {favorites.length === 0 ? <ListItemEmpty>{t("label-no-list")}</ListItemEmpty> : null}
        {favorites.map(([key, value]) => (
          <ListItem href={`/priority-list/${key}`} key={key}>
            {value}
          </ListItem>
        ))}
      </List>

      <CardSubTitle>Listes crées</CardSubTitle>
      <List>
        {created.length === 0 ? <ListItemEmpty>{t("label-no-list")}</ListItemEmpty> : null}
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
