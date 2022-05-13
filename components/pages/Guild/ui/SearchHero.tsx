import { mdiDelete } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import Character from "../../../ui/afk/Character";
import CheckboxField from "../../../ui/CheckboxField";
import Svg from "../../../ui/Svg";
import useHero from "../../TiersList/hooks/useHero";
import styles from "./SearchHero.module.css";

interface IProps {
  index: number;
  onChange: (
    value: {
      hero: number;
      ascend: number;
      si: number;
      fi: number;
      engrave: number;
      reverse: boolean;
    } | null
  ) => void;
  hero: { hero: number; ascend: number; si: number; fi: number; engrave: number; reverse: boolean };
}

function getAscendName(ascend: number) {
  return ascendLevels.find((level) => level.key === ascend)?.name;
}

const SearchHero: React.FC<IProps> = function SearchHero({ index, hero, onChange }) {
  const { t } = useTranslation("guild");
  const { t: tC } = useTranslation("common");
  const [showModal, setShowModal] = useState(false);
  const { getHero } = useHero();

  const searchString = [getHero(tC, hero.hero)?.name];
  if (hero.ascend > 0) searchString.push(t(`common:ascension-${getAscendName(hero.ascend)}`));
  if (hero.si > 0) searchString.push(`${t("common:concept.si")} +${hero.si}`);
  if (hero.fi > 0) searchString.push(`${t("common:concept.fi")} ${hero.fi}/9`);
  if (hero.engrave > 0) searchString.push(`${t("common:concept.engrave")} ${hero.engrave}`);

  return (
    <>
      <div className={styles.SearchBox}>
        <div className={styles.SearchCharacter}>
          <Character
            id={hero.hero}
            ascendLevel={hero.ascend}
            siLevel={hero.si}
            fiLevel={hero.fi}
            engraveLevel={hero.engrave}
            onClick={() => setShowModal(true)}
          />
          <span className={styles.SearchString}>{searchString.join(", ")}</span>
          {index > 0 ? (
            <Svg
              d={mdiDelete}
              onClick={() => {
                onChange(null);
              }}
            />
          ) : null}
        </div>
        <CheckboxField
          label={t("reverse-search")}
          name="reverse"
          onChange={() => onChange({ ...hero, reverse: !hero.reverse })}
          value={hero.reverse}
        />
      </div>

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChoosePriorityHero
          si={hero.si}
          fi={hero.fi}
          hero={hero.hero}
          ascend={hero.ascend}
          engrave={hero.engrave}
          onSelect={(newHero) => onChange({ ...newHero, reverse: hero.reverse })}
        />
      </Modal>
    </>
  );
};

export default SearchHero;
