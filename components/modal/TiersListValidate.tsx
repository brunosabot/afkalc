import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { IFirebasePriorityListHero } from "../providers/types/IFirebasePriorityList";
import IFirebaseProfile from "../providers/types/IFirebaseProfile";
import CardTitle from "../ui/card/CardTitle";
import Svg from "../ui/Svg";
import PlayerValidation from "./components/ui/PlayerValidation";

interface IProps {
  hero: IFirebasePriorityListHero;
  koPlayers: IFirebaseProfile[];
  okPlayers: IFirebaseProfile[];
}

const TiersListValidate: React.FC<IProps> = function TiersListValidate({
  koPlayers,
  okPlayers,
  hero,
}) {
  const [showKo, setShowKo] = useState<boolean>(true);
  const [showOk, setShowOk] = useState<boolean>(true);
  const { t } = useTranslation("guild");

  return (
    <>
      <CardTitle>
        <Svg
          onClick={() => setShowKo(!showKo)}
          d={showKo ? mdiCheckboxMarked : mdiCheckboxBlankOutline}
        />

        {t("tiers-list-ko-players")}
      </CardTitle>
      {showKo &&
        koPlayers.map((player) => (
          <PlayerValidation
            playerName={player.playerName}
            playerHero={player.heroes?.[hero.hero]}
            id={hero.hero}
            disabled
          />
        ))}
      <CardTitle>
        <Svg
          onClick={() => setShowOk(!showOk)}
          d={showOk ? mdiCheckboxMarked : mdiCheckboxBlankOutline}
        />

        {t("tiers-list-ok-players")}
      </CardTitle>
      {showOk &&
        okPlayers.map((player) => (
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
