import React from "react";
import { useTranslation } from "react-i18next";


interface IProps {
  [key: string]: never;
}

const RedditFastReward: React.FC<IProps> = () => {
  const {t} = useTranslation("common");
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
