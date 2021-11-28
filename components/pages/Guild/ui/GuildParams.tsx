import { useRouter } from "next/router";
import React, { useContext } from "react";
import GuildContext from "../../../providers/GuildContext";
import CardShareNew from "../../../ui/card/CardShareNew";
import CardAbex from "./CardAbex";
import CardConfiguration from "./CardConfiguration";
import CardDanger from "./CardDanger";
import CardDeputies from "./CardDeputies";
import CardCampaign from "./CardPlayer";

interface IProps {
  [key: string]: never;
}

const GuildParams: React.FC<IProps> = function GuildParams() {
  const { values } = useContext(GuildContext);
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  return (
    <>
      <CardShareNew>{`${process.env.NEXT_PUBLIC_URL}${localePath}/guild/${values.guild.id}`}</CardShareNew>
      <CardCampaign />
      <CardConfiguration />
      <CardAbex />
      <CardDeputies />
      <CardDanger />
    </>
  );
};

export default GuildParams;
