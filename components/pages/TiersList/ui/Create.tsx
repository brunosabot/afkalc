import { mdiPlaylistPlus } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import CardAction from "../../../ui/card/CardAction";

interface Props {
  onClick: () => void;
}

const Create: React.FC<Props> = function Create({ onClick }) {
  const { t } = useTranslation("priority-list");

  return (
    <CardAction onClick={onClick} icon={mdiPlaylistPlus}>
      {t("label-add-tiers-list")}
    </CardAction>
  );
};

export default Create;
