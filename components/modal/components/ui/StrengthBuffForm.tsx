import { useTranslation } from "next-i18next";
import React from "react";
import InputField from "../../../ui/InputField";
import FastButtons from "../../FastButtons";

const strengthBuffShort: [number, string][] = [
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
  strengthBuff: number;
  onChange: (value: number) => void;
  max: number;
}

const StrengthBuffForm: React.FC<Props> = function StrengthBuffForm({
  strengthBuff,
  onChange,
  max,
}) {
  const { t } = useTranslation("common");

  return (
    <div>
      <InputField
        small
        name="strengthBuff"
        type="number"
        label={t(`concept.strengthBuff`)}
        value={strengthBuff}
        onChange={(strengthBuffValue) => onChange(parseInt(strengthBuffValue, 10))}
      />
      <FastButtons values={strengthBuffShort.slice(0, max + 1)} onClick={onChange} />
    </div>
  );
};

export default StrengthBuffForm;
