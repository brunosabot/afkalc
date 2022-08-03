import { useTranslation } from "next-i18next";
import React from "react";
import heroes from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";
import InputField from "../../../ui/InputField";
import FastButtons from "../../FastButtons";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

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
  engrave: number;
  onChange: (value: number) => void;
}

const EngraveForm: React.FC<Props> = function EngraveForm({ hero, engrave, onChange }) {
  const { t } = useTranslation("common");

  const resource = typedHeroes.find((r) => r.id === hero);
  const isChad =
    resource?.faction === "dimensionals" ||
    resource?.faction === "celestials" ||
    resource?.faction === "hypogeans" ||
    resource?.isAwakened === true;

  return (
    <div>
      <InputField
        small
        name="engrave"
        label={t(`concept.engrave`)}
        value={engrave}
        onChange={(engraveValue) => onChange(parseInt(engraveValue, 10))}
      />
      <FastButtons values={isChad ? engraveChad : engrave4f} onClick={onChange} />
    </div>
  );
};

export default EngraveForm;
