import { useRouter } from "next/router";
import React from "react";
import CardShareNew from "../../../ui/card/CardShareNew";

interface IProps {
  userId: string;
  listId: string;
}

const ShareBanner: React.FC<IProps> = ({ userId, listId }) => {
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  return (
    <CardShareNew>
      {`https://afkalc.com${localePath}/priority-list/${userId}/${listId}`}
    </CardShareNew>
  );
};

export default React.memo(ShareBanner);
