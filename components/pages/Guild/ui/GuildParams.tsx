import React from "react";
import CardConfiguration from "./CardConfiguration";
import CardDanger from "./CardDanger";
import CardDeputies from "./CardDeputies";
import CardCampaign from "./CardPlayer";

interface IProps {
  [key: string]: never;
}

const GuildParams: React.FC<IProps> = () => (
  <>
    <CardCampaign />
    <CardDeputies />
    <CardConfiguration />
    <CardDanger />
  </>
);

export default GuildParams;
