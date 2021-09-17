import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import ascendLevels from "../../data/heroAscensionLevel.json";
import heroes from "../../data/heroes.json";
import ICharacter from "../../types/ICharacter";
import { UseSetLevelReturn } from "../pages/TiersList/hooks/useSetLevel";
import Character from "../ui/afk/Character";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Svg from "../ui/Svg";
import styles from "./EditHero.module.css";
import FastButtons from "./FastButtons";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

const siChad: [number, string][] = [
  [5, "+5"],
  [10, "+10"],
  [15, "+15"],
  [20, "+20"],
  [25, "+25"],
  [30, "+30"],
  [35, "+35"],
  [40, "+40"],
];
const si4f: [number, string][] = [
  [5, "+5"],
  [10, "+10"],
  [15, "+15"],
  [20, "+20"],
  [25, "+25"],
  [30, "+30"],
];

const fi4f: [number, string][] = [
  [0, "0/36"],
  [3, "3/36"],
  [9, "9/36"],
  [36, "36/36"],
];

const engraveChad: [number, string][] = [
  [30, "30"],
  [60, "60"],
  [80, "80"],
  [100, "100"],
];
const engrave4f: [number, string][] = [
  [30, "30"],
  [60, "60"],
  [80, "80"],
];

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

const EditHero: React.FC<Props> = ({ hero, si, fi, ascend, engrave, setLevel, onNext, onPrev }) => {
  const { t } = useTranslation("common");

  const resource = typedHeroes.find((r) => r.id === hero);
  const isChad =
    resource?.faction === "dimensionals" ||
    resource?.faction === "celestials" ||
    resource?.faction === "hypogeans";

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
        <SelectField
          values={ascendLevels.map((level) => ({
            key: `${level.key}`,
            label: t(`ascension-${level.name}`),
          }))}
          small
          name="ascend"
          label={t(`concept.ascend`)}
          value={ascend}
          onChange={(v) => setLevel(hero, "ASCEND", parseInt(v, 10)).commit()}
        />
        <div className={styles.Field}>
          <InputField
            small
            name="si"
            label={t(`concept.si`)}
            value={si}
            onChange={(v) => setLevel(hero, "SI", parseInt(v, 10)).commit()}
          />
          <FastButtons
            values={isChad ? siChad : si4f}
            onClick={(v) => setLevel(hero, "SI", v).commit()}
          />
        </div>
        <div className={styles.Field}>
          <InputField
            small
            name="fi"
            label={t(`concept.fi`)}
            value={fi}
            onChange={(v) => setLevel(hero, "FI", parseInt(v, 10)).commit()}
          />
          <FastButtons values={fi4f} onClick={(v) => setLevel(hero, "FI", v).commit()} />
        </div>
        <div className={styles.Field}>
          <InputField
            small
            name="engrave"
            label={t(`concept.engrave`)}
            value={engrave}
            onChange={(v) => setLevel(hero, "ENGRAVE", parseInt(v, 10)).commit()}
          />
          <FastButtons
            values={isChad ? engraveChad : engrave4f}
            onClick={(v) => setLevel(hero, "ENGRAVE", v).commit()}
          />
        </div>
      </div>
    </div>
  );
};

export default EditHero;
