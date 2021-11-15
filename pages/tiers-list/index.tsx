import { mdiAccountGroup, mdiPlaylistStar, mdiTree } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import Create from "../../components/pages/TiersList/ui/Create";
import CreateTree from "../../components/pages/TiersList/ui/CreateTree";
import ListItemEmpty from "../../components/pages/TiersList/ui/ListItemEmpty";
import PriorityListContext from "../../components/providers/PriorityListContext";
import TreeListContext from "../../components/providers/TreeListContext";
import Card from "../../components/ui/card/Card";
import CardActions from "../../components/ui/card/CardActions";
import CardSubTitle from "../../components/ui/card/CardSubTitle";
import CardTitle from "../../components/ui/card/CardTitle";
import List from "../../components/ui/list/List";
import ListItem from "../../components/ui/list/ListItem";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "priority-list"])),
  },
});
interface IProps {
  [key: string]: never;
}

const PriorityList: React.FC<IProps> = function PriorityList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");

  const {
    actions: { createList, load },
    values: { favorites, priorityList },
  } = useContext(PriorityListContext);

  const {
    actions: { createList: createTreeList, load: loadTree },
    values: { favorites: favoritesTree, treeList },
  } = useContext(TreeListContext);

  useEffect(() => {
    load();
    loadTree();
  });

  const onCreate = useCallback(() => {
    createList().then((newId) => {
      router.push(`/tiers-list/${newId}`);
    });
  }, [createList, router]);

  const onCreateTree = useCallback(() => {
    createTreeList().then((newId) => {
      router.push(`/tiers-list/tree/${newId}`);
    });
  }, [createTreeList, router]);

  return (
    <Card>
      <CardTitle icon={mdiPlaylistStar}>{t("title-priority-list")}</CardTitle>

      <CardSubTitle>{t("label-favorites")}</CardSubTitle>
      <List>
        {favorites.length === 0 && favoritesTree.length === 0 ? (
          <ListItemEmpty>{t("label-no-list")}</ListItemEmpty>
        ) : null}
        {favorites.map((list) => (
          <ListItem icon={mdiAccountGroup} href={`/tiers-list/${list.id}`} key={list.id}>
            {list.title}
          </ListItem>
        ))}
        {favoritesTree.map((list) => (
          <ListItem icon={mdiTree} href={`/tiers-list/tree/${list.id}`} key={list.id}>
            {list.title}
          </ListItem>
        ))}
      </List>

      <CardSubTitle>{t("label-created")}</CardSubTitle>
      <List>
        {priorityList.length === 0 && treeList.length === 0 ? (
          <ListItemEmpty>{t("label-no-list")}</ListItemEmpty>
        ) : null}
        {priorityList.map((list) => (
          <ListItem icon={mdiAccountGroup} href={`/tiers-list/${list.id}`} key={list.id}>
            {list.title}
          </ListItem>
        ))}
        {treeList.map((list) => (
          <ListItem icon={mdiTree} href={`/tiers-list/tree/${list.id}`} key={list.id}>
            {list.title}
          </ListItem>
        ))}
      </List>

      <CardActions>
        <CreateTree onClick={onCreateTree} />
        <Create onClick={onCreate} />
      </CardActions>
    </Card>
  );
};

export default withLayoutPrivate(PriorityList);
