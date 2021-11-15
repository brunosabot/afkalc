import { useTranslation } from "next-i18next";
import React from "react";
import HeroClass from "../../types/HeroClass";
import { IFirebaseTreeListStep } from "../providers/types/IFirebaseTreeList";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import styles from "./ChooseTreeStep.module.css";

interface Props {
  onSelect: (value: IFirebaseTreeListStep) => void;
  heroClass?: HeroClass;
  level?: number;
}

const ChooseTreeStep: React.FC<Props> = function ChooseTreeStep({
  heroClass = HeroClass.ranger,
  level = 0,
  onSelect,
}) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.ChooseTreeStep}>
      <div className={styles.InputWrapper}>
        <SelectField
          values={[
            { key: HeroClass.mage, label: t(`common:heroClass.${HeroClass.mage}`) },
            { key: HeroClass.ranger, label: t(`common:heroClass.${HeroClass.ranger}`) },
            { key: HeroClass.support, label: t(`common:heroClass.${HeroClass.support}`) },
            { key: HeroClass.tank, label: t(`common:heroClass.${HeroClass.tank}`) },
            { key: HeroClass.warrior, label: t(`common:heroClass.${HeroClass.warrior}`) },
          ]}
          style={{ width: "200px" }}
          small
          name="ascend"
          label={t(`concept.ascend`)}
          value={heroClass}
          onChange={(value) =>
            onSelect({
              heroClass: value as HeroClass,
              level,
            })
          }
        />
        <InputField
          style={{ width: "100px" }}
          small
          name="si"
          label={t(`concept.si`)}
          value={level}
          onChange={(value) =>
            onSelect({
              heroClass,
              level: parseInt(value, 10) || 0,
            })
          }
        />
      </div>
    </div>
  );
};

export default ChooseTreeStep;
