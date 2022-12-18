import { mdiPaw } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import CardAction from "../../../ui/card/CardAction";

interface Props {
  onClick: () => void;
}

const CreatePet: React.FC<Props> = function CreatePet({ onClick }) {
  const { t } = useTranslation("priority-list");

  return (
    <CardAction onClick={onClick} icon={mdiPaw}>
      {t("label-add-pet-list")}
    </CardAction>
  );
};

export default CreatePet;
