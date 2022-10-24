import { useTranslation } from "next-i18next";
import React from "react";
import InputField from "../../../ui/InputField";
import FastButtons from "../../FastButtons";

const agilityBuffShort: [number, string][] = [
  [0, "0"],
  [1, "1"],
  [2, "2"],
  [3, "3"],
  [4, "4"],
  [5, "5"],
  [6, "6"],
];

interface Props {
  agilityBuff: number;
  onChange: (value: number) => void;
}

const AgilityBuffForm: React.FC<Props> = function AgilityBuffForm({ agilityBuff, onChange }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <InputField
        small
        name="agilityBuff"
        label={t(`concept.agilityBuff`)}
        value={agilityBuff}
        onChange={(agilityBuffValue) => onChange(parseInt(agilityBuffValue, 10))}
      />
      <FastButtons values={agilityBuffShort} onClick={onChange} />
    </div>
  );
};

export default AgilityBuffForm;
