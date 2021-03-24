import { useTranslation } from "next-i18next";
import React from "react";
import CardAction from "../../../ui/card/CardAction";

interface Props {
  onClick: () => void;
}

const Create: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation("priority-list");

  return (
    <CardAction
      onClick={onClick}
      icon="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"
    >
      {t("label-add")}
    </CardAction>
  );
};

export default Create;
