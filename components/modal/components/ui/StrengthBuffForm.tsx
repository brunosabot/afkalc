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
];

interface Props {
  strengthBuff: number;
  onChange: (value: number) => void;
}

const StrengthBuffForm: React.FC<Props> = function StrengthBuffForm({ strengthBuff, onChange }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <InputField
        small
        name="strengthBuff"
        label={t(`concept.strengthBuff`)}
        value={strengthBuff}
        onChange={(strengthBuffValue) => onChange(parseInt(strengthBuffValue, 10))}
      />
      <FastButtons values={strengthBuffShort} onClick={onChange} />
    </div>
  );
};

export default StrengthBuffForm;
