import React from "react";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import InputField from "../../../ui/InputField";
import { UseSetLevelReturn } from "../../TiersList/hooks/useSetLevel";

interface IProps {
  id: number;
  setLevel: UseSetLevelReturn;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  isView: boolean;
  shouldUnlock: boolean;
}

const FiField: React.FC<IProps> = function FiField({
  id,
  setLevel,
  getValue,
  isView,
  shouldUnlock = false,
}) {
  const value = getValue(id, "fi");

  return (
    <InputField
      label=""
      small
      onChange={(v) => setLevel(id, "FI", parseInt(v, 10)).commit()}
      value={value === 0 ? "" : value}
      disabled={getValue(id, "ascend") < 7 && shouldUnlock === false}
      readOnly={isView}
      maxLength={1}
      style={{ width: "32px", textAlign: "center" }}
      name={`fi-${id}`}
      inputMode="numeric"
    />
  );
};

export default FiField;
