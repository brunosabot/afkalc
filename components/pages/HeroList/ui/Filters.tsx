import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import CheckboxField from "../../../ui/CheckboxField";
import ClassFilter from "./ClassFilter";
import FactionFilter from "./FactionFilter";
import InputFilter from "./InputFilter";
import RoleFilter from "./RoleFilter";
import SelectFilter from "./SelectFilter";
import TypeFilter from "./TypeFilter";

interface IProps {
  state: State;
  dispatch: (action: Action) => void;
}

interface Action {
  type: string;
  value: string;
}

interface State {
  type: string;
  class: string;
  role: string;
  faction: string;
  ascend: string;
  si: string;
  fi: string;
  directionAscend: string;
  directionSi: string;
  directionFi: string;
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
            label="SI"
            dispatch={dispatch}
            name="si"
          />
          <InputFilter
            value={state.fi}
            directionValue={state.directionFi}
            label="FI"
            dispatch={dispatch}
            name="fi"
          />
          <SelectFilter
            value={state.ascend}
            directionValue={state.directionAscend}
            label="Ascension"
            dispatch={dispatch}
            name="ascend"
            values={ascendLevels.map((level) => ({
              key: `${level.key}`,
              label: t(`ascension-${level.name}`),
            }))}
          />
          <div style={{ paddingTop: "16px" }} />
        </>
      ) : null}
    </>
  );
};

export default Filters;
