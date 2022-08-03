import { useTranslation } from "next-i18next";
import React from "react";
import heroes from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";
import CheckboxField from "../../../ui/CheckboxField";
import InputField from "../../../ui/InputField";
import FastButtons from "../../FastButtons";
import styles from "./SiForm.module.css";

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
interface Props {
  hero: number;
  si: number;
  onChange: (value: any) => void;
}

const SiForm: React.FC<Props> = function SiForm({ hero, si, onChange }) {
  const { t } = useTranslation("common");

  const resource = typedHeroes.find((r) => r.id === hero);
  const isChad =
    resource?.faction === "dimensionals" ||
    resource?.faction === "celestials" ||
    resource?.faction === "hypogeans" ||
    resource?.isAwakened === true;

  return (
    <>
      <div className={styles.FieldCheckbox}>
        <CheckboxField
          label={t(`concept.siUnlocked`)}
          name="siUnlocked"
          value={si > -1}
          onChange={(value) => onChange(value ? 0 : -1)}
        />
      </div>
      <div className={styles.Field}>
        <InputField
          small
          name="si"
          label={t(`concept.si`)}
          value={si === -1 ? "" : si}
          disabled={si === -1}
          onChange={(value) => onChange(parseInt(value, 10))}
        />
        <FastButtons values={isChad ? siChad : si4f} onClick={onChange} />
      </div>
    </>
  );
};

export default SiForm;
