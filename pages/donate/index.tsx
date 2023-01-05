import { mdiCurrencyBtc, mdiGiftOutline } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import Crypto from "../../components/pages/Donate/Crypto";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import styles from "./index.module.css";

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

        <a
          href="https://www.buymeacoffee.com/afkalc"
          target="_blank"
          rel="noreferrer"
          className={styles.BuyMeACoffee}
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
            alt="Buy Me A Coffee"
            className={styles.BuyMeACoffeeImage}
          />
        </a>

        <div className={styles.PatreonWrapper}>
          <a
            href="https://www.patreon.com/bePatron?u=51828187"
            className={styles.Patreon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 569 546" xmlns="http://www.w3.org/2000/svg" height="16" width="16">
              <g>
                <circle cx="362.589996" cy="204.589996" r="204.589996" />
                <rect height="545.799988" width="100" x="0" y="0" />
              </g>
            </svg>
            Become a Patron!
          </a>
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
