import React from "react";
import { useTranslation } from "../../../../i18n";

interface IProps {
  [key: string]: never;
}

const RedditResourceCost: React.FC<IProps> = () => {
  const { t } = useTranslation("common");
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href="https://www.reddit.com/r/afkarena/comments/g685qx/merchant_values_reference_spreadsheet/"
    >
      {t("external.reddit")}
    </a>
  );
};

export default RedditResourceCost;
