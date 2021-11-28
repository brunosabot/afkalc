import { useRouter } from "next/router";
import React from "react";
import CardShareNew from "../../../ui/card/CardShareNew";

interface IProps {
  listId: string;
}

const TreeShareBanner: React.FC<IProps> = function TreeShareBanner({ listId }) {
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  return (
    <CardShareNew>{`${process.env.NEXT_PUBLIC_URL}${localePath}/tiers-list/tree/${listId}`}</CardShareNew>
  );
};

export default React.memo(TreeShareBanner);
