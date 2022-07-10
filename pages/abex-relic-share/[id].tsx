import { mdiShare } from "@mdi/js";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import withLayoutPublicColumn from "../../components/layout/withLayoutPublicColumn";
import ShareBanner from "../../components/pages/AbexRelicShare/ui/ShareBanner";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import CardWarn from "../../components/ui/card/CardWarn";
import abexData from "../../data/abex.json";
import elderTreeJson from "../../data/elder-tree.json";
import HeroClass from "../../types/HeroClass";
import classes from "./index.module.css";

const MAX_LEVEL = Object.keys(elderTreeJson.ranger).length - 1;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "abex-relic-share"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

interface IProps {
  [key: string]: never;
}

function getUrl(elder: string[], relics: string[], tiles: string[]) {
  return `/abex-relic-share/${elder.join(",")}-${relics.join(",")}-${tiles.join(",")}`;
}

const AbexRelicShare: React.FC<IProps> = function AbexRelicShare() {
  const { t } = useTranslation("abex-relic-share");
  const [valid, setValid] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  const heroClassKeys = Object.keys(HeroClass) as HeroClass[];

  const [rawElder, rawRelics, rawTiles] = (id as string).split("-");

  const [elderTree, setElderTree] = React.useState<string[]>(rawElder.split(","));
  const [relics, setRelics] = React.useState<string[]>(rawRelics.split(","));
  const [tiles, setTiles] = React.useState<string[]>(rawTiles.split(","));

  useEffect(() => {
    const areElderTreeValid = elderTree.every((elder) => `${parseInt(elder, 10)}` === elder);
    const areRelicsValid = relics.every((relic) => {
      const relicSplit = relic.split(".");

      if (relicSplit.length !== 2) return false;
      if (`${parseInt(relicSplit[0], 10)}` !== relicSplit[0]) return false;
      if (`${parseInt(relicSplit[1], 10)}` !== relicSplit[1]) return false;

      if (+relicSplit[0] < 0 || +relicSplit[0] > 5) return false;
      if (+relicSplit[1] < 0 || +relicSplit[1] > 6) return false;

      return true;
    });
    const areTilesValid = tiles.every((tile) => `${parseInt(tile, 10)}` === tile);

    setValid(areElderTreeValid && areRelicsValid && areTilesValid);

    router.replace(getUrl(elderTree, relics, tiles));
  }, [elderTree, relics, router, tiles]);

  return (
    <>
      <Card>
        <CardTitle icon={mdiShare}>{t("common:menu.abex-relic-share")}</CardTitle>
        <ShareBanner url={id as string} />
        {valid === false ? <CardWarn>{t("invalid-data")}</CardWarn> : null}
      </Card>
      <Card>
        <CardTitle>{t("elder-tree")}</CardTitle>
        <div className={classes.Category}>
          {heroClassKeys.map((heroClass, i) => (
            <span className={classes.Bloc}>
              <img
                key={heroClass}
                src={`/classes/${heroClass}.png`}
                className={classes.Image}
                alt={`${heroClass}`}
              />
              <input
                value={elderTree[i]}
                className={classes.Field}
                onChange={(e) => {
                  const newElderTree = [...elderTree];
                  newElderTree[i] = e.target.value;
                  setElderTree(newElderTree);
                }}
                type="number"
                min="0"
                max={MAX_LEVEL}
              />
            </span>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>{t("abyssal-expedition-relics")}</CardTitle>
        <div className={classes.Category}>
          {heroClassKeys.map((heroClass, i) => (
            <span className={classes.Bloc}>
              <img
                key={heroClass}
                src={`/classes/${heroClass}.png`}
                className={classes.Image}
                alt={`${heroClass}`}
              />
              <input
                value={relics[i]}
                className={classes.Field}
                onChange={(e) => {
                  const newRelics = [...relics];
                  newRelics[i] = e.target.value;
                  setRelics(newRelics);
                }}
              />
            </span>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>{t("abyssal-expedition-tiles")}</CardTitle>
        <div className={classes.CategoryCamp}>
          {abexData.campType.map((camp, i) => (
            <span className={classes.Bloc}>
              <span className={classes.Tile}>{camp.name}</span>
              <input
                value={tiles[i]}
                className={classes.Field}
                onChange={(e) => {
                  const newTiles = [...tiles];
                  newTiles[i] = e.target.value;
                  setTiles(newTiles);
                }}
                type="number"
                min="0"
                max="40"
              />
            </span>
          ))}
        </div>
      </Card>
    </>
  );
};

export default withLayoutPublicColumn(AbexRelicShare);
