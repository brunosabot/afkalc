import React from "react";
import { useTranslation } from "react-i18next";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import SelectField from "../../../ui/SelectField";

interface Props {
  hero: number;
  si: number;
  fi: number;
  ascend: number;
  engrave: number;
  onChange: (value: number) => void;
}

const AscendForm: React.FC<Props> = function AscendForm({
  hero,
  si,
  fi,
  ascend,
  engrave,
  onChange,
}) {
  const { t } = useTranslation("common");

  return (
    <SelectField
      values={ascendLevels.map((level) => ({
        key: `${level.key}`,
        label: t(`ascension-${level.name}`),
      }))}
      small
      name="ascend"
      label={t(`concept.ascend`)}
      value={ascend}
      onChange={(value) => onChange(parseInt(value, 10))}
    />
  );
};

export default AscendForm;
