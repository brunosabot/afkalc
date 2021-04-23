import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import GuildContext from "../../../providers/GuildContext";
import CardTitle from "../../../ui/card/CardTitle";
import CheckboxField from "../../../ui/CheckboxField";

interface IProps {
  [key: string]: never;
}

const CardConfiguration: React.FC<IProps> = () => {
  const {
    actions: { setShowAbexTab },
    values: {
      isOwner,
      guild: { showAbexTab },
    },
  } = useContext(GuildContext);

  const { t } = useTranslation("guild");

  if (isOwner === false) return null;

  return (
    <>
      <CardTitle>{t("title-configuration")}</CardTitle>

      <CheckboxField
        name="showAbexTab"
        onChange={setShowAbexTab}
        value={showAbexTab}
        label={t("label-show-abex-tab")}
      />
    </>
  );
};

export default CardConfiguration;
