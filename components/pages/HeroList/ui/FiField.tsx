import React from "react";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import InputField from "../../../ui/InputField";

interface IProps {
  id: number;
  setLevel: (id: number, field: "fi", value: number) => void;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  isView: boolean;
  shouldUnlock: boolean;
}

const FiField: React.FC<IProps> = ({ id, setLevel, getValue, isView, shouldUnlock = false }) => {
  const value = getValue(id, "fi");

  return (
    <InputField
      label=""
      small
      onChange={(v) => setLevel(id, "fi", parseInt(v, 10))}
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
