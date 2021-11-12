import { mdiTree } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import CardAction from "../../../ui/card/CardAction";

interface Props {
  onClick: () => void;
}

const CreateTree: React.FC<Props> = function CreateTree({ onClick }) {
  const { t } = useTranslation("priority-list");

  return (
    <CardAction onClick={onClick} icon={mdiTree}>
      {t("label-add-elder-tree-list")}
    </CardAction>
  );
};

export default CreateTree;
