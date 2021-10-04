import React from "react";
import CardAbex from "./CardAbex";
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
    <CardConfiguration />
    <CardAbex />
    <CardDeputies />
    <CardDanger />
  </>
);

export default GuildParams;
