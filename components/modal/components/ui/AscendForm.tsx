import { useTranslation } from "next-i18next";
import React from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import SelectField from "../../../ui/SelectField";

interface Props {
  ascend: number;
  onChange: (value: number) => void;
  isAwakened: boolean;
}

const AscendForm: React.FC<Props> = function AscendForm({ isAwakened, ascend, onChange }) {
  const { t } = useTranslation("common");

  const ascendLevelsFiltered = ascendLevels.filter(
    (level) => isAwakened === false || level.key >= 3 || level.key === 0
  );

  return (
    <SelectField
      values={ascendLevelsFiltered.map((level) => ({
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
