import { mdiAccountHeart } from "@mdi/js";
import Head from "next/head";
import React from "react";
import ListItem from "../../components/pages/Credit/ui/ListItem";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import List from "../../components/ui/list/List";
import InSeason from "../../components/ui/reddit/InSeason";
import Whitesushii from "../../components/ui/reddit/Whitesushii";
import WilordFR from "../../components/ui/reddit/WilordFR";
import { useTranslation } from "../../i18n";

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = () => {
  const { t } = useTranslation("common");

  return (
    <Card>
      <CardTitle icon={mdiAccountHeart}>{t("common:menu.credit")}</CardTitle>
      <Head>
        <title>{`${t("common:menu.credit")} - Afkalc`}</title>
        <meta name="description" content={t("common:credit-desc")} />
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
        <ListItem><span>infherna</span></ListItem>
      </List>
    </Card>
  );
};

export default Home;
