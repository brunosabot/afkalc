import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import React from "react";
import { getAscend } from "../../lib/hero";
import Type from "../../types/Type";
import { UseSetLevelReturn } from "../pages/TiersList/hooks/useSetLevel";
import Character from "../ui/afk/Character";
import Svg from "../ui/Svg";
import AscendForm from "./components/ui/AscendForm";
import EngraveForm from "./components/ui/EngraveForm";
import EquipForm from "./components/ui/EquipForm";
import FiForm from "./components/ui/FiForm";
import SiForm from "./components/ui/SiForm";
import styles from "./EditHero.module.css";

interface Props {
  character: {
    id: number;
    si: number;
    fi: number;
    ascend: number;
    engrave: number;
    partbody: number;
    partboots: number;
    parthead: number;
    partweapon: number;
    partbodyfaction: number;
    partbootsfaction: number;
    partheadfaction: number;
    partweaponfaction: number;
    isAwakened: boolean;
    type: Type;
  };
  setLevel: UseSetLevelReturn;
  onPrev: () => void;
  onNext: () => void;
}

const EditHero: React.FC<Props> = function EditHero({ character, setLevel, onNext, onPrev }) {
  const { isAwakened, si, fi, ascend, engrave, type, id } = character;

  return (
    <div className={styles.EditHero}>
      <div className={styles.EditHeroSwitch}>
        <button type="button" className={styles.Button} onClick={onPrev}>
          <Svg d={mdiChevronLeft} />
        </button>
        <Character
          ascendLevel={ascend}
          siLevel={si}
          fiLevel={fi}
          engraveLevel={engrave}
          id={id}
          size="large"
        />
        <button type="button" className={styles.Button} onClick={onNext}>
          <Svg d={mdiChevronRight} />
        </button>
      </div>
      <div className={styles.Form}>
        <AscendForm
          isAwakened={isAwakened}
          ascend={ascend}
          onChange={(ascendValue) =>
            setLevel(id, "ASCEND", getAscend(ascendValue, si, fi, engrave)).commit()
          }
        />
        <SiForm
          hero={id}
          si={si}
          onChange={(siValue) =>
            setLevel(id, "SI", parseInt(siValue, 10))
              .again(id, "ASCEND", getAscend(ascend, parseInt(siValue, 10), fi, engrave))
              .commit()
          }
        />
        <FiForm
          fi={fi}
          onChange={(fiValue) =>
            setLevel(id, "FI", fiValue)
              .again(id, "ASCEND", getAscend(ascend, si, fiValue, engrave))
              .commit()
          }
        />
        <EngraveForm
          engrave={engrave}
          hero={id}
          onChange={(engraveValue) =>
            setLevel(id, "ENGRAVE", engraveValue)
              .again(id, "ASCEND", getAscend(ascend, si, fi, engraveValue))
              .commit()
          }
        />
        <EquipForm
          hero={id}
          type={type}
          values={{
            weapon: character.partweapon || 0,
            body: character.partbody || 0,
            boots: character.partboots || 0,
            head: character.parthead || 0,
          }}
          factionValues={{
            weapon: character.partweaponfaction || 0,
            body: character.partbodyfaction || 0,
            boots: character.partbootsfaction || 0,
            head: character.partheadfaction || 0,
          }}
          onChangeFaction={(part, equipValue) => setLevel(id, part, equipValue).commit()}
          onChange={(part, equipValue) => setLevel(id, part, equipValue).commit()}
        />
      </div>
    </div>
  );
};

export default EditHero;
