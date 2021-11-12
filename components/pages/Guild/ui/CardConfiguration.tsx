import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import GuildContext from "../../../providers/GuildContext";
import CardTitle from "../../../ui/card/CardTitle";
import CheckboxField from "../../../ui/CheckboxField";
import InputField from "../../../ui/InputField";

interface IProps {
  [key: string]: never;
}

const CardConfiguration: React.FC<IProps> = function CardConfiguration() {
  const {
    actions: { setShowAbexTab, setName },
    values: {
      isOwner,
      guild: { showAbexTab, name },
    },
  } = useContext(GuildContext);

  const { t } = useTranslation("guild");

  if (isOwner === false) return null;

  return (
    <>
      <CardTitle>{t("title-configuration")}</CardTitle>

      <InputField
        label={t("label-guild-name")}
        name="name"
        onChange={(e) => setName(e)}
        value={name}
      />

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
