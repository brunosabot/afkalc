import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import React from "react";
import Pet from "../ui/afk/Pet";
import Svg from "../ui/Svg";
import AgilityBuffForm from "./components/ui/AgilityBuffForm";
import IntelligenceBuffForm from "./components/ui/IntelligenceBuffForm";
import StrengthBuffForm from "./components/ui/StrengthBuffForm";
import styles from "./EditPet.module.css";

export type SetLevelType = "strengthBuff" | "intelligenceBuff" | "agilityBuff";

interface Props {
  pet: {
    id: string;
    strengthBuff: number;
    intelligenceBuff: number;
    agilityBuff: number;
  };
  setLevel: (id: string, type: SetLevelType, value: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const EditPet: React.FC<Props> = function EditPet({
  pet,
  setLevel,
  onPrev = () => {},
  onNext = () => {},
}) {
  const { id, strengthBuff, intelligenceBuff, agilityBuff } = pet;

  return (
    <div className={styles.EditPet}>
      <div className={styles.EditPetSwitch}>
        <button type="button" className={styles.Button} onClick={onPrev}>
          <Svg d={mdiChevronLeft} />
        </button>
        <Pet
          strengthBuff={strengthBuff}
          intelligenceBuff={intelligenceBuff}
          agilityBuff={agilityBuff}
          id={id}
        />
        <button type="button" className={styles.Button} onClick={onNext}>
          <Svg d={mdiChevronRight} />
        </button>
      </div>
      <div className={styles.Form}>
        <StrengthBuffForm
          strengthBuff={strengthBuff}
          onChange={(strengthBuffValue) => setLevel(id, "strengthBuff", strengthBuffValue)}
        />
        <IntelligenceBuffForm
          intelligenceBuff={intelligenceBuff}
          onChange={(intelligenceBuffValue) =>
            setLevel(id, "intelligenceBuff", intelligenceBuffValue)
          }
        />
        <AgilityBuffForm
          agilityBuff={agilityBuff}
          onChange={(agilityBuffValue) => setLevel(id, "agilityBuff", agilityBuffValue)}
        />
      </div>
    </div>
  );
};

export default EditPet;
