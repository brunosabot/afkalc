import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import heroesJson from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";
import CheckboxField from "../../../ui/CheckboxField";
import InputField from "../../../ui/InputField";
import ClassFilter from "./ClassFilter";
import FactionFilter from "./FactionFilter";
import InputFilter from "./InputFilter";
import RoleFilter from "./RoleFilter";
import SelectFilter from "./SelectFilter";
import TypeFilter from "./TypeFilter";

const typedHeroes: ICharacter[] = heroesJson as ICharacter[];

interface IProps {
  state: State;
  dispatch: (action: Action) => void;
}

interface Action {
  type: string;
  value: string;
}

interface State {
  name: string;
  type: string;
  class: string;
  role: string;
  faction: string;
  ascend: string;
  si: string;
  fi: string;
  engrave: string;
  directionAscend: string;
  directionSi: string;
  directionFi: string;
  directionEngrave: string;
}

const Filters: React.FC<IProps> = ({ state, dispatch }) => {
  const { t } = useTranslation("hero-list");
  const [showFilter, setShowFilter] = useState(true);

  return (
    <>
      <CheckboxField
        name="showFilter"
        onChange={setShowFilter}
        value={showFilter}
        label={t("label-show-filters")}
      />
      {showFilter ? (
        <>
          <InputField
            name="name"
            label={t("label-name-filter")}
            value={state.name}
            onChange={(value) => dispatch({ type: "name", value })}
            list="heroes"
          />
          <datalist id="heroes">
            {typedHeroes.map((hero) => (
              <option key={hero.id} value={hero.name}>
                {hero.name}
              </option>
            ))}
          </datalist>
          <FactionFilter
            filter={state.faction}
            setFilter={(value) => dispatch({ type: "faction", value })}
            imagePath="factions"
          />
          <TypeFilter
            filter={state.type}
            setFilter={(value) => dispatch({ type: "type", value })}
            imagePath="types"
          />
          <ClassFilter
            filter={state.class}
            setFilter={(value) => dispatch({ type: "class", value })}
            imagePath="classes"
          />
          <RoleFilter
            filter={state.role}
            setFilter={(value) => dispatch({ type: "role", value })}
            imagePath="roles"
          />

          <InputFilter
            value={state.si}
            directionValue={state.directionSi}
            label={t("common:concept.si")}
            dispatch={dispatch}
            name="si"
          />
          <InputFilter
            value={state.fi}
            directionValue={state.directionFi}
            label={t("common:concept.fi")}
            dispatch={dispatch}
            name="fi"
          />
          <SelectFilter
            value={state.ascend}
            directionValue={state.directionAscend}
            label={t("common:concept.ascend")}
            dispatch={dispatch}
            name="ascend"
            values={ascendLevels.map((level) => ({
              key: `${level.key}`,
              label: t(`common:ascension-${level.name}`),
            }))}
          />
          <InputFilter
            value={state.engrave}
            directionValue={state.directionEngrave}
            label={t("common:concept.engrave")}
            dispatch={dispatch}
            name="engrave"
          />
          <div style={{ paddingTop: "16px" }} />
        </>
      ) : null}
    </>
  );
};

export default Filters;
