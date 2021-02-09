import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "../../../../i18n";
import CardShare from "../../../ui/card/CardShare";

interface IProps {
  userId: string;
  listId: string;
}

const ShareBanner: React.FC<IProps> = ({ userId, listId }) => {
  const { t } = useTranslation("priority-list");
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  return (
    <CardShare label={t("label-share")} style={{ backgroundColor: "var(--hover-color)" }}>
      {`https://afkalc.com${localePath}/priority-list/${userId}/${listId}`}
    </CardShare>
  );
};

export default React.memo(ShareBanner);
