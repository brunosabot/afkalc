import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "../../../../i18n";
import { getDuration, getFrom } from "../../../../lib/time";
import ColWithImage from "../../../ui/list/ColWithImage";

interface IChest {
  image: string;
  Content: string;
  CD: number;
}

interface IProps {
  pass: string;
  chest: IChest;
}

const Chest: React.FC<IProps> = ({ pass, chest }) => {
  const { t } = useTranslation("loot");
  const date = dayjs(pass, "L LTS");
  const obtainedDate = date.add(chest.CD, "s");
  const isOK = obtainedDate.isBefore(dayjs());

  const actions = (
    <>
      <div className="loot__duration">{getDuration(chest.CD)}</div>
      <div className="loot__remaining">{isOK ? t("label-ok") : getFrom(date, chest.CD)}</div>
    </>
  );

  return (
    <ColWithImage
      key={chest.Content}
      image={chest.image}
      title={t(`${chest.Content}`)}
      actions={actions}
    />
  );
};

export default Chest;
