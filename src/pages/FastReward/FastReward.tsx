import React, { useCallback, useState } from "react";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import SelectField from "../../components/ui/SelectField";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import DiamondLine from "./DiamondLine";
import useMaxLevel from "./useMaxLevel";

interface IProps {
  [key: string]: never;
}

const vip = [
  { key: "6", label: "6" },
  { key: "7", label: "7" },
  { key: "8", label: "8" },
  { key: "9", label: "9" },
  { key: "10", label: "10" },
  { key: "11", label: "11" },
  { key: "12", label: "12" },
  { key: "13", label: "13" },
  { key: "14", label: "14" },
  { key: "15", label: "15" },
  { key: "16", label: "16" },
  { key: "17", label: "17" },
  { key: "18", label: "18" },
];

const player = [
  { key: "0", label: "<90" },
  { key: "90", label: "90" },
  { key: "95", label: "95" },
  { key: "100", label: "100" },
  { key: "105", label: "105" },
  { key: "110", label: "110" },
  { key: "120", label: "120" },
  { key: "130", label: "130" },
  { key: "140", label: "140" },
  { key: "150", label: "150" },
  { key: "160", label: "160" },
  { key: "170", label: "170" },
  { key: "180", label: "180+" },
];

const campaign = [
  { key: "18-40", label: "18-40" },
  { key: "20-60", label: "20-60" },
  { key: "22-60", label: "22-60" },
  { key: "24-60", label: "24-60" },
  { key: "25-60", label: "25-60" },
  { key: "26-60", label: "26-60" },
  { key: "32-60", label: "32-60" },
];

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

  const onChange = useCallback((setter) => {
    return (e: string) => {
      const val = Number(e);
      if (!Number.isNaN(val) && val >= 0) {
        setter(val);
      }
    };
  }, []);

  const diams50 = useMaxLevel(50, playerLevel, vipLevel);
  const diams80 = useMaxLevel(80, playerLevel, vipLevel);
  const diams100 = useMaxLevel(100, playerLevel, vipLevel);

  const uInSeason = (
    <a target="_blank" rel="noreferrer" href="https://www.reddit.com/user/inSeason/">
      u/inSeason
    </a>
  );
  const reddit = (
    <a
      target="_blank"
      rel="noreferrer"
      href="https://www.reddit.com/r/afkarena/comments/iu7vnt/optimizing_fast_rewards_reference_sheet/"
    >
      Reddit
    </a>
  );

  return (
    <div>
      {showHelp ? (
        <Card>
          <div style={{ padding: "16px" }}>
            This tool is aimed to give you how many diamonds you should use daily on the fast reward
            feature. Credit to &nbsp;
            {uInSeason}
            &nbsp; on &nbsp;
            {reddit}
            &nbsp;
          </div>
        </Card>
      ) : null}
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
