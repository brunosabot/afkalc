import { useTranslation } from "next-i18next";
import React from "react";
import InputField from "../../../ui/InputField";
import FastButtons from "../../FastButtons";

const intelligenceBuffShort: [number, string][] = [
  [0, "0"],
  [1, "1"],
  [2, "2"],
  [3, "3"],
  [4, "4"],
  [5, "5"],
  [6, "6"],
];

interface Props {
  intelligenceBuff: number;
  onChange: (value: number) => void;
}

const IntelligenceBuffForm: React.FC<Props> = function IntelligenceBuffForm({
  intelligenceBuff,
  onChange,
}) {
  const { t } = useTranslation("common");

  return (
    <div>
      <InputField
        small
        name="intelligenceBuff"
        label={t(`concept.intelligenceBuff`)}
        value={intelligenceBuff}
        onChange={(intelligenceBuffValue) => onChange(parseInt(intelligenceBuffValue, 10))}
      />
      <FastButtons values={intelligenceBuffShort} onClick={onChange} />
    </div>
  );
};

export default IntelligenceBuffForm;
