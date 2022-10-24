import React from "react";
import petsJson from "../../../../data/pets.json";
import IPet from "../../../../types/IPet";
import { IFirebasePetList } from "../../../providers/types/IFirebasePets";
import PetTooltip from "../../../tooltip/PetTooltip";
import Pet from "../../../ui/afk/Pet";
import PetGrid from "../../../ui/PetGrid";
import classes from "./TabPets.module.css";

const typedPets: IPet[] = petsJson as IPet[];

interface ITabPetsProps {
  pets?: IFirebasePetList;
}

const TabPets: React.FC<ITabPetsProps> = function TabPets({ pets }) {
  return (
    <div className={classes.TabPets}>
      <PetGrid size="large">
        {typedPets.map((pet) => {
          const thePet = pets?.[pet.id] ?? {
            id: pet.id,
            strengthBuff: -1,
            intelligenceBuff: -1,
            agilityBuff: -1,
          };

          return (
            <Pet
              label={<PetTooltip pet={thePet} />}
              id={thePet.id}
              strengthBuff={thePet.strengthBuff}
              intelligenceBuff={thePet.intelligenceBuff}
              agilityBuff={thePet.agilityBuff}
            />
          );
        })}
      </PetGrid>
    </div>
  );
};

export default TabPets;
