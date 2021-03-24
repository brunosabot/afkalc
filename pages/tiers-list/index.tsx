import { mdiPlaylistStar } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect } from "react";
import Create from "../../components/pages/TiersList/ui/Create";
import ListItem from "../../components/pages/TiersList/ui/ListItem";
import ListItemEmpty from "../../components/pages/TiersList/ui/ListItemEmpty";
import PriorityListContext from "../../components/providers/PriorityListContext";
import ProfileContext from "../../components/providers/ProfileContext";
import LoginButton from "../../components/ui/button/LoginButton";
import Card from "../../components/ui/card/Card";
import CardActions from "../../components/ui/card/CardActions";
import CardSubTitle from "../../components/ui/card/CardSubTitle";
import CardTitle from "../../components/ui/card/CardTitle";
import List from "../../components/ui/list/List";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "priority-list"])),
  },
});
interface IProps {
  [key: string]: never;
}

const PriorityList: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation("priority-list");

  const {
    values: { isAuth },
  } = useContext(ProfileContext);
  const {
    actions: { createList, load },
    values: { favorites, priorityList },
  } = useContext(PriorityListContext);

  useEffect(() => load());

  const onCreate = useCallback(() => {
    createList().then((newId) => {
      router.push(`/tiers-list/${newId}`);
    });
  }, [createList, router]);

  if (isAuth === false) {
    return (
      <Card>
        <CardTitle>{t("common:require-login")}</CardTitle>
        <LoginButton />
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle icon={mdiPlaylistStar}>{t("title-priority-list")}</CardTitle>

      <CardSubTitle>{t("label-favorites")}</CardSubTitle>
      <List>
        {favorites.length === 0 ? <ListItemEmpty>{t("label-no-list")}</ListItemEmpty> : null}
        {favorites.map((list) => (
          <ListItem href={`/tiers-list/${list.id}`} key={list.id}>
            {list.title}
          </ListItem>
        ))}
      </List>

      <CardSubTitle>{t("label-created")}</CardSubTitle>
      <List>
        {priorityList.length === 0 ? <ListItemEmpty>{t("label-no-list")}</ListItemEmpty> : null}
        {priorityList.map((list) => (
          <ListItem href={`/tiers-list/${list.id}`} key={list.id}>
            {list.title}
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
