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
  [7, "7"],
  [8, "8"],
  [9, "9"],
  [10, "10"],
  [11, "11"],
  [12, "12"],
  [13, "13"],
  [14, "14"],
  [15, "15"],
  [16, "16"],
  [17, "17"],
  [18, "18"],
];

interface Props {
  agilityBuff: number;
  onChange: (value: number) => void;
  max: number;
}

const AgilityBuffForm: React.FC<Props> = function AgilityBuffForm({ agilityBuff, onChange, max }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <InputField
        small
        name="agilityBuff"
        type="number"
        label={t(`concept.agilityBuff`)}
        value={agilityBuff}
        onChange={(agilityBuffValue) => onChange(parseInt(agilityBuffValue, 10))}
      />
      <FastButtons values={agilityBuffShort.slice(0, max + 1)} onClick={onChange} />
    </div>
  );
};

export default AgilityBuffForm;
