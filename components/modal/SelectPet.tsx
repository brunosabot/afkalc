// import { useTranslation } from "next-i18next";
import { useTranslation } from "next-i18next";
import React, { useCallback, useContext } from "react";
import pets from "../../data/pets.json";
import IPet from "../../types/IPet";
import ProfileContext from "../providers/ProfileContext";
import Pet from "../ui/afk/Pet";
import CharacterGrid from "../ui/CharacterGrid";
import AgilityBuffForm from "./components/ui/AgilityBuffForm";
import IntelligenceBuffForm from "./components/ui/IntelligenceBuffForm";
import StrengthBuffForm from "./components/ui/StrengthBuffForm";
import classes from "./SelectPet.module.css";

const typedPets: IPet[] = pets as IPet[];

interface ICurrentPet {
  id: string;
  agilityBuff: number;
  intelligenceBuff: number;
  strengthBuff: number;
}

interface Props {
  onSelect: (value: ICurrentPet) => void;
  pet: ICurrentPet;
}

const SelectPet: React.FC<Props> = function SelectPet({ pet, onSelect }) {
  const { t } = useTranslation("common");
  const { values } = useContext(ProfileContext);

  const onApplyMine = useCallback(() => {
    onSelect({
      id: pet.id,
      agilityBuff: values.pets[pet.id]?.agilityBuff ?? 0,
      intelligenceBuff: values.pets[pet.id]?.intelligenceBuff ?? -1,
      strengthBuff: values.pets[pet.id]?.strengthBuff ?? 0,
    });
  }, [pet.id, onSelect, values.pets]);

  const thePet = typedPets.find((p) => p.id === pet.id);

  return (
    <>
      <CharacterGrid>
        {pets.map(({ id }) => (
          <Pet
            key={id}
            id={id}
            agilityBuff={pet.agilityBuff}
            intelligenceBuff={pet.intelligenceBuff}
            strengthBuff={pet.strengthBuff}
            onClick={() => onSelect({ ...pet, id })}
            highlight={pet.id === id}
          />
        ))}
      </CharacterGrid>

      <button onClick={onApplyMine} type="button" className={classes.Button}>
        {t("use-my-pet-stats")}
      </button>

      <div className={classes.Form}>
        <StrengthBuffForm
          strengthBuff={pet.strengthBuff}
          onChange={(strengthBuffValue) => onSelect({ ...pet, strengthBuff: strengthBuffValue })}
          max={thePet?.elevation === "legendary" ? 18 : 12}
        />
        <IntelligenceBuffForm
          intelligenceBuff={pet.intelligenceBuff}
          onChange={(intelligenceBuffValue) =>
            onSelect({ ...pet, intelligenceBuff: intelligenceBuffValue })
          }
          max={thePet?.elevation === "legendary" ? 18 : 12}
        />
        <AgilityBuffForm
          agilityBuff={pet.agilityBuff}
          onChange={(agilityBuffValue) => onSelect({ ...pet, agilityBuff: agilityBuffValue })}
          max={thePet?.elevation === "legendary" ? 18 : 12}
        />
      </div>
    </>
  );
};

export default SelectPet;
