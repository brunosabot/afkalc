import React, { useState } from "react";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import SelectField from "../../components/ui/SelectField";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import DiamondLine from "./components/ui/DiamondLine";
import useMaxLevel from "./components/hooks/useMaxLevel";
import vip from "../../data/fastRewardVip.json";
import player from "../../data/fastRewardPlayer.json";
import campaign from "../../data/fastRewardCampaign.json";
import Help from "./components/ui/Help";
import useOnChangeNumber from "../../hooks/useOnChangeNumber";

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

  const onChange = useOnChangeNumber();

  const diams50 = useMaxLevel(50, playerLevel, vipLevel);
  const diams80 = useMaxLevel(80, playerLevel, vipLevel);
  const diams100 = useMaxLevel(100, playerLevel, vipLevel);

  return (
    <div>
      <Help showHelp={showHelp} />
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>Enter your current progression</CardTitle>
        <SelectField
          value={vipLevel}
          values={vip}
          label="Your VIP level"
          onChange={onChange(setVipLevel)}
        />
        <SelectField
          value={playerLevel}
          values={player}
          label="Your player level"
          onChange={onChange(setPlayerLevel)}
        />
        <SelectField
          value={campaignLevel}
          values={campaign}
          label="Campaign progression"
          onChange={setCampaignLevel}
        />
      </Card>

      <Card>
        <CardTitle>You should use fast reward with:</CardTitle>
        <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams50} count={50} />
        <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams80} count={80} />
        <DiamondLine campaignLevel={campaignLevel} diamsLevel={diams100} count={100} />
      </Card>
    </div>
  );
};

export default FastReward;
