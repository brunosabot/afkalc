import { mdiAccountHeart } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import ListItem from "../../components/pages/Credit/ui/ListItem";
import { FirebaseContext } from "../../components/providers/FirebaseProvider";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import List from "../../components/ui/list/List";
import InSeason from "../../components/ui/reddit/InSeason";
import Whitesushii from "../../components/ui/reddit/Whitesushii";
import WilordFR from "../../components/ui/reddit/WilordFR";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
interface IProps {
  [key: string]: never;
}

const Credit: React.FC<IProps> = function Credit() {
  const { t } = useTranslation("common");
  const { values } = useContext(FirebaseContext);

  return (
    <Card>
      <CardTitle icon={mdiAccountHeart}>{t("common:menu.credit")}</CardTitle>
      <Head>
        <title>{`${t("common:menu.credit")} - Afkalc`}</title>
        <meta name="description" content={t("common:credit-desc") ?? ""} />
      </Head>

      <div style={{ padding: "16px" }}>{t("common:credit-desc")}</div>

      <List>
        <ListItem>
          <InSeason />
        </ListItem>
        <ListItem>
          <Whitesushii />
        </ListItem>
        <ListItem>
          <WilordFR />
        </ListItem>
        <ListItem>
          <span>infherna</span>
        </ListItem>
        <ListItem>
          <span>BRTP</span>
        </ListItem>
      </List>

      <CardTitle icon={mdiAccountHeart}>{t("common:sponsors")}</CardTitle>
      <List>
        {values.donation
          .filter((e) => e)
          .map((e) => (
            <ListItem>{e}</ListItem>
          ))}
      </List>
    </Card>
  );
};

export default withLayoutPrivate(Credit);
