import { useTranslation } from "next-i18next";
import React from "react";

interface IProps {
  [key: string]: never;
}

const RedditFastReward: React.FC<IProps> = function RedditFastReward() {
  const { t } = useTranslation("common");
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href="https://www.reddit.com/r/afkarena/comments/iu7vnt/optimizing_fast_rewards_reference_sheet/"
    >
      {t("external.reddit")}
    </a>
  );
};

export default RedditFastReward;
