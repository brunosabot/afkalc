import React from "react";
import Card from "../../../../ui/card/Card";
import InSeason from "../../../../ui/reddit/InSeason";
import RedditFastReward from "./RedditFastReward";

interface IProps {
  showHelp: boolean;
}

const Help: React.FC<IProps> = ({ showHelp }) => {
  if (showHelp === false) return null;

  return (
    <Card>
      <div style={{ padding: "16px" }}>
        This tool is aimed to give you how many diamonds you should use daily on the fast reward
        feature. Credit to &nbsp;
        <InSeason />
        &nbsp; on &nbsp;
        <RedditFastReward />
        &nbsp;
      </div>
    </Card>
  );
};

export default Help;
