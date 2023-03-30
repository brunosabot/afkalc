import { mdiCurrencyBtc, mdiGiftOutline } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import BuyMeACoffee from "../../components/pages/Donate/BuyMeACoffee";
import Crypto from "../../components/pages/Donate/Crypto";
import Patreon from "../../components/pages/Donate/Patreon";
import Paypal from "../../components/pages/Donate/Paypal";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "donate"])),
  },
});

interface IProps {
  [key: string]: never;
}

const Donate: React.FC<IProps> = function Donate() {
  const { t } = useTranslation("donate");

  return (
    <>
      <Card>
        <Head>
          <title>{`${t("common:menu.donate")} - Afkalc`}</title>
        </Head>

        <CardTitle icon={mdiGiftOutline}>{t("common:menu.donate")}</CardTitle>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            marginBottom: "16px",
            flexDirection: "column",
          }}
        >
          <BuyMeACoffee />
          <Patreon />
          <Paypal />
        </div>
      </Card>
      <Card>
        <CardTitle icon={mdiCurrencyBtc}>{t("cryptocurrency")}</CardTitle>
        <Crypto label="Basic Attention Token" value="0x07c00BD16e775Ad2De4e13209EbAa7271ec33D29" />
        <Crypto label="Bitcoin" value="3NzdxerUewyqdhoNc4RLGombX9W3ogHRAt" />
        <Crypto label="Ethereum" value="0xFB56Eb6be34c59b216aA8FbCd54f67587D2D0bE3" />
      </Card>
    </>
  );
};

export default withLayoutPrivateColumn(Donate);
