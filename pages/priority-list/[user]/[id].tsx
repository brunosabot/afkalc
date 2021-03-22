import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useFirestoreQuery from "../../../components/hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../../../components/hooks/useFirestoreQueryReference";
import ListItem from "../../../components/pages/TiersList/ui/ListItem";
import ListItemEmpty from "../../../components/pages/TiersList/ui/ListItemEmpty";
import { FirebaseContext } from "../../../components/providers/FirebaseProvider";
import IFirebasePriorityList from "../../../components/providers/types/IFirebasePriorityList";
import LoginButton from "../../../components/ui/button/LoginButton";
import Card from "../../../components/ui/card/Card";
import CardTitle from "../../../components/ui/card/CardTitle";
import List from "../../../components/ui/list/List";
import { useTranslation } from "../../../i18n";

interface IProps {
  [key: string]: never;
}

const PriorityList: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { values } = useContext(FirebaseContext);
  const { user, id } = router.query;

  const favoriteQuery = useFirestoreQueryReference(
    "priority-list",
    "legacyId",
    "==",
    `${user}$${id}`
  );

  const favoriteResult = useFirestoreQuery<IFirebasePriorityList[]>(favoriteQuery);

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

      <Card>
        <CardTitle>{t("label-moved")}</CardTitle>
        <List>
          {favoriteResult?.data?.length === 0 ? (
            <ListItemEmpty>{t("label-moved-no-list")}</ListItemEmpty>
          ) : null}
          {favoriteResult?.data?.map((list) => (
            <ListItem href={`/tiers-list/${list.id}`} key={list.id}>
              {list.title}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default PriorityList;
