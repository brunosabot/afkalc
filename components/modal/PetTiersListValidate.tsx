import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { IFirebasePetListStep } from "../providers/types/IFirebasePetList";
import IFirebaseProfile from "../providers/types/IFirebaseProfile";
import Svg from "../ui/Svg";
import CardTitle from "../ui/card/CardTitle";
import PetValidation from "./components/ui/PetValidation";

interface IProps {
  pet: IFirebasePetListStep;
  koPlayers: IFirebaseProfile[];
  okPlayers: IFirebaseProfile[];
}

const PetTiersListValidate: React.FC<IProps> = function PetTiersListValidate({
  koPlayers,
  okPlayers,
  pet,
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
          <PetValidation
            playerName={player.playerName}
            playerPet={player.pets?.[pet.pet]}
            id={pet.pet}
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
          <PetValidation
            playerName={player.playerName}
            playerPet={player.pets?.[pet.pet]}
            id={pet.pet}
          />
        ))}
    </>
  );
};

export default PetTiersListValidate;
