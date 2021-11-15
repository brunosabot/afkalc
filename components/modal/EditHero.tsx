import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import React from "react";
import { getAscend } from "../../lib/hero";
import { UseSetLevelReturn } from "../pages/TiersList/hooks/useSetLevel";
import Character from "../ui/afk/Character";
import Svg from "../ui/Svg";
import AscendForm from "./components/ui/AscendForm";
import EngraveForm from "./components/ui/EngraveForm";
import FiForm from "./components/ui/FiForm";
import SiForm from "./components/ui/SiForm";
import styles from "./EditHero.module.css";

interface Props {
  hero: number;
  si: number;
  fi: number;
  ascend: number;
  engrave: number;
  setLevel: UseSetLevelReturn;
  onPrev: () => void;
  onNext: () => void;
}

const EditHero: React.FC<Props> = function EditHero({
  hero,
  si,
  fi,
  ascend,
  engrave,
  setLevel,
  onNext,
  onPrev,
}) {
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
          id={hero}
          size="large"
        />
        <button type="button" className={styles.Button} onClick={onNext}>
          <Svg d={mdiChevronRight} />
        </button>
      </div>
      <div className={styles.Form}>
        <AscendForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(ascendValue) =>
            setLevel(hero, "ASCEND", getAscend(ascendValue, si, fi, engrave)).commit()
          }
        />
        <SiForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(siValue) =>
            setLevel(hero, "SI", parseInt(siValue, 10))
              .again(hero, "ASCEND", getAscend(ascend, parseInt(siValue, 10), fi, engrave))
              .commit()
          }
        />
        <FiForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(fiValue) =>
            setLevel(hero, "FI", fiValue)
              .again(hero, "ASCEND", getAscend(ascend, si, fiValue, engrave))
              .commit()
          }
        />
        <EngraveForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(engraveValue) =>
            setLevel(hero, "ENGRAVE", engraveValue)
              .again(hero, "ASCEND", getAscend(ascend, si, fi, engraveValue))
              .commit()
          }
        />
      </div>
    </div>
  );
};

export default EditHero;
