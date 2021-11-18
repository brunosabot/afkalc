import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useFirestoreQuery from "../../../components/hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../../../components/hooks/useFirestoreQueryReference";
import withLayoutPrivate from "../../../components/layout/withLayoutPrivate";
import ListItem from "../../../components/pages/TiersList/ui/ListItem";
import ListItemEmpty from "../../../components/pages/TiersList/ui/ListItemEmpty";
import IFirebasePriorityList from "../../../components/providers/types/IFirebasePriorityList";
import Card from "../../../components/ui/card/Card";
import CardTitle from "../../../components/ui/card/CardTitle";
import List from "../../../components/ui/list/List";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "abex-relic-sell",
      "abex-relic",
      "common",
      "donate",
      "elder-tree",
      "elite-summon",
      "fast-reward",
      "guild",
      "hero-list",
      "item-cost",
      "loot",
      "priority-list",
      "settings",
      "signature-item",
      "top-team",
      "translation",
    ])),
  },
});

interface IProps {
  [key: string]: never;
}

const PriorityList: React.FC<IProps> = function PriorityList() {
  const router = useRouter();
  const { t } = useTranslation("priority-list");
  const { user, id } = router.query;

  const favoriteQuery = useFirestoreQueryReference(
    "priority-list",
    "legacyId",
    "==",
    `${user}${id}`
  );

  const favoriteResult = useFirestoreQuery<IFirebasePriorityList[]>(favoriteQuery);

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

export default withLayoutPrivate(PriorityList);
