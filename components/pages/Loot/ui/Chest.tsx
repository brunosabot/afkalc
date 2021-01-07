import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "../../../../i18n";
import { getDuration, getFrom } from "../../../../lib/time";
import Item from "../../../ui/afk/Item";
import ColWithImage from "../../../ui/list/ColWithImage";
import PrimaryText from "../../../ui/typography/PrimaryText";
import SecondaryText from "../../../ui/typography/SecondaryText";
import useItem from "../../ItemCost/hooks/useItem";

interface IChest {
  item: string;
  CD: number;
}

interface IProps {
  pass: string;
  chest: IChest;
}

const Chest: React.FC<IProps> = ({ pass, chest }) => {
  const { getItem } = useItem();
  const { t } = useTranslation("loot");
  const { t: tc } = useTranslation("common");
  const date = dayjs(pass, "L LTS");
  const obtainedDate = date.add(chest.CD, "s");
  const isOK = obtainedDate.isBefore(dayjs());
  const { name, info, secondaryInfo } = getItem(chest.item);

  const actions = (
    <>
      <SecondaryText>{getDuration(chest.CD)}</SecondaryText>
      <PrimaryText>{isOK ? t("label-ok") : getFrom(date, chest.CD)}</PrimaryText>
    </>
  );

  return (
    <ColWithImage
      key={chest.item}
      image={<Item name={name} infos={info} secondaryInfos={secondaryInfo} />}
      title={tc(`item.${chest.item}`)}
      actions={actions}
    />
  );
};

export default Chest;
