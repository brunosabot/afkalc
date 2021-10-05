import React from "react";
import { useTranslation } from "react-i18next";
import { IFirebasePriorityListHero } from "../providers/types/IFirebasePriorityList";
import IFirebaseProfile from "../providers/types/IFirebaseProfile";
import CardTitle from "../ui/card/CardTitle";
import PlayerValidation from "./components/ui/PlayerValidation";

interface IProps {
  hero: IFirebasePriorityListHero;
  koPlayers: IFirebaseProfile[];
  okPlayers: IFirebaseProfile[];
}

const TiersListValidate: React.FC<IProps> = ({ koPlayers, okPlayers, hero }) => {
  const { t } = useTranslation("guild");

  return (
    <>
      <CardTitle>{t("tiers-list-ko-players")}</CardTitle>
      {koPlayers.map((player) => (
        <PlayerValidation
          playerName={player.playerName}
          playerHero={player.heroes?.[hero.hero]}
          id={hero.hero}
        />
      ))}
      <CardTitle>{t("tiers-list-ok-players")}</CardTitle>
      {okPlayers.map((player) => (
        <PlayerValidation
          playerName={player.playerName}
          playerHero={player.heroes?.[hero.hero]}
          id={hero.hero}
        />
      ))}
    </>
  );
};

export default TiersListValidate;
