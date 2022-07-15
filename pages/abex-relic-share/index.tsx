import { useRouter } from "next/router";
import React, { useContext } from "react";
import withLayoutPublicColumn from "../../components/layout/withLayoutPublicColumn";
import ProfileContext from "../../components/providers/ProfileContext";
import abexData from "../../data/abex.json";
import { getRelicRank } from "../../lib/abex";
import HeroClass from "../../types/HeroClass";

interface IProps {
  [key: string]: never;
}

const AbexRelicShare: React.FC<IProps> = function AbexRelicShare() {
  const router = useRouter();
  const { values } = useContext(ProfileContext);

  const heroClassKeys = Object.keys(HeroClass) as HeroClass[];

  const url = `${heroClassKeys
    .map((heroClass) => values.elderTree[heroClass])
    .join(",")}-${heroClassKeys
    .map((heroClass) => getRelicRank(values.abexCurrentRelics[heroClass]))
    .join(",")}-${abexData.campType
    .map((camp) => values.abexTiles[camp.id]?.amount ?? 0)
    .join(",")}`;

  if (process.browser) {
    router.replace(`/abex-relic-share/${url}`);
  }

  return <div />;
};

export default withLayoutPublicColumn(AbexRelicShare);
