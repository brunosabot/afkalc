import Head from "next/head";
import React, { useState } from "react";
import useTotal from "../../components/pages/ItemCost/hooks/useTotal";
import Help from "../../components/pages/ItemCost/ui/Help";
import ResourceDetail from "../../components/pages/ItemCost/ui/ResourceDetail";
import TotalCost from "../../components/pages/ItemCost/ui/TotalCost";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import { useTranslation } from "../../i18n";

interface IProps {
  [key: string]: never;
}

const ItemCost: React.FC<IProps> = () => {
  const { t } = useTranslation("item-cost");
  const [showHelp, setShowHelp] = useState(false);
  const [firstPart, setFirstPart] = useState<{ [key: string]: number }>({});
  const [secondPart, setSecondPart] = useState<{ [key: string]: number }>({});

  const totalFirstPartValue = useTotal(firstPart);
  const totalSecondPartValue = useTotal(secondPart);

  return (
    <div style={{ paddingTop: "8px" }}>
      <Head>
        <title>{`${t("common:menu.item-cost")} - Afkalc`}</title>
        <meta name="description" content={t("help")} />
      </Head>
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("form-title-1")}</CardTitle>

        {showHelp ? <Help /> : null}

        {Object.entries(firstPart).map(([key, value]) => (
          <ResourceDetail
            key={key}
            value={value}
            onSelect={(item) => {
              const newItem = { ...firstPart };
              delete newItem[key];
              setFirstPart({ ...newItem, [item]: 0 });
            }}
            onValue={(v) => setFirstPart({ ...firstPart, [key]: parseInt(v, 10) })}
            resource={key}
            side={1}
          />
        ))}
        <ResourceDetail
          onSelect={(item) => setFirstPart({ ...firstPart, [item]: 0 })}
          onValue={() => {}}
          resource=""
          side={1}
        />
        <TotalCost isBest={totalFirstPartValue >= totalSecondPartValue}>
          {totalFirstPartValue}
        </TotalCost>
      </Card>
      <Card>
        <CardTitle>{t("form-title-2")}</CardTitle>
        {Object.entries(secondPart).map(([key, value]) => (
          <ResourceDetail
            key={key}
            value={value}
            onSelect={(item) => {
              const newItem = { ...secondPart };
              delete newItem[key];
              setSecondPart({ ...newItem, [item]: 0 });
            }}
            onValue={(v) => setSecondPart({ ...secondPart, [key]: parseInt(v, 10) })}
            resource={key}
            side={2}
          />
        ))}
        <ResourceDetail
          onSelect={(item) => setSecondPart({ ...secondPart, [item]: 0 })}
          onValue={() => {}}
          resource=""
          side={2}
        />
        <TotalCost isBest={totalSecondPartValue >= totalFirstPartValue}>
          {totalSecondPartValue}
        </TotalCost>
      </Card>
    </div>
  );
};

export default ItemCost;
