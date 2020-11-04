import React from 'react';
import Card from "../../../../components/ui/card/Card";
import RedditFastReward from "./RedditFastReward";
import InSeason from "../../../../components/ui/reddit/InSeason";

interface Props {
   showHelp: boolean;
}

const Help: React.FC<Props> = ({showHelp}) => {
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
  )
};

export default Help