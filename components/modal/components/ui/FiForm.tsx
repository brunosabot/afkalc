import { useTranslation } from "next-i18next";
import React from "react";
import InputField from "../../../ui/InputField";
import FastButtons from "../../FastButtons";

const fi4f: [number, string][] = [
  [0, "0/36"],
  [3, "3/36"],
  [9, "9/36"],
  [36, "36/36"],
];

interface Props {
  fi: number;
  onChange: (value: number) => void;
}

const FiForm: React.FC<Props> = function FiForm({ fi, onChange }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <InputField
        small
        name="fi"
        label={t(`concept.fi`)}
        value={fi}
        onChange={(fiValue) => onChange(parseInt(fiValue, 10))}
      />
      <FastButtons values={fi4f} onClick={onChange} />
    </div>
  );
};

export default FiForm;
