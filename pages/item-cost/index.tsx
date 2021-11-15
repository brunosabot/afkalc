import { mdiDiamondStone, mdiHelpBox } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useState } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import useTotal from "../../components/pages/ItemCost/hooks/useTotal";
import Block from "../../components/pages/ItemCost/ui/Block";
import Help from "../../components/pages/ItemCost/ui/Help";
import TotalCost from "../../components/pages/ItemCost/ui/TotalCost";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import Svg from "../../components/ui/Svg";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "item-cost"])),
  },
});
interface IProps {
  [key: string]: never;
}

const ItemCost: React.FC<IProps> = function ItemCost() {
  const { t } = useTranslation("item-cost");
  const [showHelp, setShowHelp] = useState(false);
  const [firstPart, setFirstPart] = useState<{ [key: string]: number }>({});
  const [secondPart, setSecondPart] = useState<{ [key: string]: number }>({});

  const totalFirstPartValue = useTotal(firstPart);
  const totalSecondPartValue = useTotal(secondPart);

  return (
    <>
      <Head>
        <title>{`${t("common:menu.item-cost")} - Afkalc`}</title>
        <meta name="description" content={t("help")} />
      </Head>
      <Card>
        <CardTitle
          icon={mdiDiamondStone}
          action={<Svg onClick={() => setShowHelp(!showHelp)} d={mdiHelpBox} />}
        >
          {t("form-title-1")}
        </CardTitle>

        {showHelp ? <Help /> : null}

        <TotalCost isBest={totalFirstPartValue >= totalSecondPartValue}>
          {totalFirstPartValue}
        </TotalCost>

        <Block values={firstPart} setValues={setFirstPart} />
      </Card>
      <Card>
        <CardTitle icon={mdiDiamondStone}>{t("form-title-2")}</CardTitle>

        <TotalCost isBest={totalSecondPartValue >= totalFirstPartValue}>
          {totalSecondPartValue}
        </TotalCost>

        <Block values={secondPart} setValues={setSecondPart} />
      </Card>
    </>
  );
};

export default withLayoutPrivate(ItemCost);
