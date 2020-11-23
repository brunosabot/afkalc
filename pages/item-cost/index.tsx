import i18n from "i18next";
import Head from "next/head";
import React, { useCallback, useMemo, useState } from "react";
import useItem from "../../components/pages/ItemCost/hooks/useItem";
import Help from "../../components/pages/ItemCost/ui/Help";
import ResourceDetail from "../../components/pages/ItemCost/ui/ResourceDetail";
import TotalCost from "../../components/pages/ItemCost/ui/TotalCost";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import { useTranslation } from "../../i18n";

i18n.loadNamespaces("item-cost");

interface IProps {
  [key: string]: never;
}

const ItemCost: React.FC<IProps> = () => {
  const { t } = useTranslation("item-cost");
  const [showHelp, setShowHelp] = useState(false);
  const [firstPart, setFirstPart] = useState<number[]>([]);
  const [firstPartValue, setFirstPartValue] = useState<number[]>([]);
  const [secondPart, setSecondPart] = useState<number[]>([]);
  const [secondPartValue, setSecondPartValue] = useState<number[]>([]);
  const { getItem } = useItem();

  const updatePart = useCallback(
    (index, oldValue, setter) => (id: number) => {
      const newValue = [...oldValue];
      newValue[index] = id;
      setter(newValue);
    },
    []
  );

  const totalFirstPartValue = useMemo(() => {
    return firstPart.reduce((acc, resource, i) => {
      const value = firstPartValue[i] || 0;
      return acc + Math.round(100 * value * (getItem(resource) || { cost: 0 }).cost) / 100;
    }, 0);
  }, [firstPart, firstPartValue]);
  const totalSecondPartValue = useMemo(() => {
    return secondPart.reduce((acc, resource, i) => {
      const value = secondPartValue[i] || 0;
      return acc + Math.round(100 * value * (getItem(resource) || { cost: 0 }).cost) / 100;
    }, 0);
  }, [secondPart, secondPartValue]);

  return (
    <div>
      <Head>
        <title>{`${t("common:menu.item-cost")} - Afkalc`}</title>
        <meta name="description" content={t("help")} />
      </Head>
      {showHelp ? (
        <Help showHelp={showHelp} />
      ) : null}
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("form-title-1")}</CardTitle>
        {firstPart.map((resource, i) => (
          <ResourceDetail
            key={resource}
            value={firstPartValue[i]}
            onSelect={updatePart(i, firstPart, setFirstPart)}
            onValue={updatePart(i, firstPartValue, setFirstPartValue)}
            resource={resource}
          />
        ))}
        <ResourceDetail
          value={0}
          onValue={updatePart(firstPart.length, firstPartValue, setFirstPartValue)}
          onSelect={(id: number) => setFirstPart([...firstPart, id])}
          resource={0}
        />
        <TotalCost isBest={totalFirstPartValue >= totalSecondPartValue}>{totalFirstPartValue}</TotalCost>
      </Card>
      <Card>
        <CardTitle>{t("form-title-2")}</CardTitle>
        {secondPart.map((resource, i) => (
          <ResourceDetail
            key={resource}
            value={secondPartValue[i]}
            onSelect={updatePart(i, secondPart, setSecondPart)}
            onValue={updatePart(i, secondPartValue, setSecondPartValue)}
            resource={resource}
          />
        ))}
        <ResourceDetail
          value={0}
          onValue={updatePart(secondPart.length, secondPartValue, setSecondPartValue)}
          onSelect={(id: number) => setSecondPart([...secondPart, id])}
          resource={0}
        />
        <TotalCost isBest={totalSecondPartValue >= totalFirstPartValue}>{totalSecondPartValue}</TotalCost>
      </Card>
    </div>
  );
};

export default ItemCost;
