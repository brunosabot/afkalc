import i18n from "i18next";
import Head from "next/head";
import React, { useState } from "react";
import useFirestoreWithBackup from "../../components/hooks/useFirestoreWithBackup";
import useOnChangeNumber from "../../components/hooks/useOnChangeNumber";
import useMaxLevel from "../../components/pages/FastReward/hooks/useMaxLevel";
import DiamondLine from "../../components/pages/FastReward/ui/DiamondLine";
import Help from "../../components/pages/FastReward/ui/Help";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import SelectField from "../../components/ui/SelectField";
import campaign from "../../data/fastRewardCampaign.json";
import player from "../../data/fastRewardPlayer.json";
import vip from "../../data/fastRewardVip.json";
import { useTranslation } from "../../i18n";

i18n.loadNamespaces("fast-reward");

interface IProps {
  [key: string]: never;
}

const FastReward: React.FC<IProps> = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [vipLevel, setVipLevel] = useFirestoreWithBackup("%ID%", "fast-reward", "vip", 6);
  const [playerLevel, setPlayerLevel] = useFirestoreWithBackup("%ID%", "fast-reward", "player", 0);
  const [campaignLevel, setCampaignLevel] = useFirestoreWithBackup<string>(
    "%ID%",
    "fast-reward",
    "campaign",
    "12-40"
  );

  const { t } = useTranslation("fast-reward");
  const onChange = useOnChangeNumber();

  const diams50 = useMaxLevel(50, playerLevel, vipLevel);
  const diams80 = useMaxLevel(80, playerLevel, vipLevel);
  const diams100 = useMaxLevel(100, playerLevel, vipLevel);

  return (
    <div>
      <Head>
        <title>{`${t("common:menu.fast-reward")} - Afkalc`}</title>
        <meta name="description" content={t("help")} />
      </Head>
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("form-title")}</CardTitle>

        {showHelp ? <Help /> : null}

        <SelectField
          name="vip-level"
          value={vipLevel}
          values={vip}
          label={t("vip-level")}
          onChange={onChange(setVipLevel)}
        />
        <SelectField
          name="player-level"
          value={playerLevel}
          values={player}
          label={t("player-level")}
          onChange={onChange(setPlayerLevel)}
        />
        <SelectField
          name="campaign-level"
          value={campaignLevel}
          values={campaign}
          label={t("campaign-level")}
          onChange={setCampaignLevel}
        />
      </Card>

      <Card>
        <CardTitle>{t("result-title")}</CardTitle>
        <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams50} count={50} />
        <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams80} count={80} />
        <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams100} count={100} />
      </Card>
    </div>
  );
};

export default FastReward;
