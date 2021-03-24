import { mdiHelpBox, mdiUpdate } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useCallback, useContext, useMemo, useState } from "react";
import useChestLevel from "../../components/pages/Loot/hooks/useChestLevel";
import Chest from "../../components/pages/Loot/ui/Chest";
import PassNowLabel from "../../components/pages/Loot/ui/PassNowLabel";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import InputField from "../../components/ui/InputField";
import Svg from "../../components/ui/Svg";

interface IProps {
  [key: string]: never;
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "loot"])),
  },
});

const Loot: React.FC<IProps> = () => {
  const [showHelp, setShowHelp] = useState(false);
  const {
    actions: { setCampaignLevel, setCampaignSuccessDate },
    values: { campaignLevel, campaignSuccessDate },
  } = useContext(ProfileContext);

  const pass = useMemo(() => dayjs(new Date(campaignSuccessDate)).format("L LTS"), [
    campaignSuccessDate,
  ]);
  const setPass = useCallback(
    (value) => {
      setCampaignSuccessDate(dayjs(value, "L LTS").toDate().toISOString());
    },
    [setCampaignSuccessDate]
  );

  const { t } = useTranslation("loot");
  const chests = useChestLevel(campaignLevel);
  const passLabel = <PassNowLabel setPass={setPass} />;

  return (
    <div
      style={{
        paddingTop: "24px",
        gap: "16px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Card>
        <Head>
          <title>{`${t("common:menu.loot")} - Afkalc`}</title>
          <meta name="description" content={t("help")} />
        </Head>

        <CardTitle
          icon={mdiUpdate}
          action={<Svg onClick={() => setShowHelp(!showHelp)} d={mdiHelpBox} />}
        >
          {t("form-title")}
        </CardTitle>

        {showHelp ? <CardHelp>{t("help")}</CardHelp> : null}

        <InputField
          name="level"
          value={campaignLevel}
          label={t("label-campaign-level")}
          onChange={setCampaignLevel}
        />
        <InputField name="pass" value={pass} label={passLabel} onChange={setPass} />
      </Card>

      <Card>
        <CardTitle>{t("result-title")}</CardTitle>

        {chests.map((chest) => (
          <Chest key={chest.item} pass={pass} chest={chest} />
        ))}
      </Card>
    </div>
  );
};

export default Loot;
