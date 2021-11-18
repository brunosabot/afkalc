import { mdiFastForward, mdiHelpBox } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useContext, useState } from "react";
import useOnChangeNumber from "../../components/hooks/useOnChangeNumber";
import withLayoutPrivateColumn from "../../components/layout/withLayoutPrivateColumn";
import useMaxLevel from "../../components/pages/FastReward/hooks/useMaxLevel";
import DiamondLine from "../../components/pages/FastReward/ui/DiamondLine";
import Help from "../../components/pages/FastReward/ui/Help";
import ProfileContext from "../../components/providers/ProfileContext";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Svg from "../../components/ui/Svg";
import vip from "../../data/fastRewardVip.json";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
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

const FastReward: React.FC<IProps> = function FastReward() {
  const {
    actions: { setPlayerLevel, setPlayerVipLevel, setCampaignLevel },
    values: { playerLevel, playerVipLevel, campaignLevel },
  } = useContext(ProfileContext);

  const [showHelp, setShowHelp] = useState(false);
  const { t } = useTranslation("fast-reward");
  const onChange = useOnChangeNumber();

  const diams50 = useMaxLevel(50, playerLevel, playerVipLevel);
  const diams80 = useMaxLevel(80, playerLevel, playerVipLevel);
  const diams100 = useMaxLevel(100, playerLevel, playerVipLevel);

  return (
    <>
      <Head>
        <title>{`${t("common:menu.fast-reward")} - Afkalc`}</title>
        <meta name="description" content={t("help")} />
      </Head>
      <Card>
        <CardTitle
          icon={mdiFastForward}
          action={<Svg onClick={() => setShowHelp(!showHelp)} d={mdiHelpBox} />}
        >
          {t("form-title")}
        </CardTitle>

        {showHelp ? <Help /> : null}

        <SelectField
          name="vip-level"
          value={playerVipLevel}
          values={vip}
          label={t("vip-level")}
          onChange={onChange(setPlayerVipLevel)}
        />
        <InputField
          inputMode="numeric"
          name="player-level"
          value={playerLevel}
          label={t("player-level")}
          onChange={onChange(setPlayerLevel)}
        />
        <InputField
          name="campaign-level"
          value={campaignLevel}
          label={t("campaign-level")}
          onChange={setCampaignLevel}
        />
      </Card>

      <Card>
        <CardTitle>{t("result-title")}</CardTitle>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams50} count={50} />
          <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams80} count={80} />
          <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams100} count={100} />
        </div>
      </Card>
    </>
  );
};

export default withLayoutPrivateColumn(FastReward);
