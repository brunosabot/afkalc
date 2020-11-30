import i18n from "i18next";
import Head from "next/head";
import React, { useState } from "react";
import useOnChangeNumber from "../../components/hooks/useOnChangeNumber";
import Item from "../../components/ui/afk/Item";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import CardValue from "../../components/ui/card/CardValue";
import InputField from "../../components/ui/InputField";
import { useTranslation } from "../../i18n";
import { getEstimatedDiamsForSummon } from "../../lib/summon";

i18n.loadNamespaces("elite-summon");

interface IProps {
  [key: string]: never;
}

const EliteSummon: React.FC<IProps> = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [elite, setElite] = useState(0);
  const [eliteP, setEliteP] = useState(0);
  const [legendary, setLegendary] = useState(0);
  const [legendaryP, setLegendaryP] = useState(0);
  const [mythic, setMythic] = useState(0);
  const [mythicP, setMythicP] = useState(0);
  const { t } = useTranslation("elite-summon");

  const diams = getEstimatedDiamsForSummon(elite, eliteP, legendary, legendaryP, mythic, mythicP);
  const onChange = useOnChangeNumber();

  return (
    <div>
      <Card>
        <Head>
          <title>{`${t("common:menu.elite-summon")} - Afkalc`}</title>
          <meta name="description" content={t("help")} />
        </Head>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("current-count-label")}</CardTitle>

        {showHelp ? <CardHelp>{t("help")}</CardHelp> : null}

        <InputField
          value={elite}
          name="current-elite"
          label={t("current-elite")}
          onChange={onChange(setElite)}
        />
        <InputField
          value={eliteP}
          name="current-elite-p"
          label={t("current-elite-p")}
          onChange={onChange(setEliteP)}
        />
        <InputField
          value={legendary}
          name="current-legendary"
          label={t("current-legendary")}
          onChange={onChange(setLegendary)}
        />
        <InputField
          value={legendaryP}
          name="current-legendary-p"
          label={t("current-legendary-p")}
          onChange={onChange(setLegendaryP)}
        />
        <InputField
          value={mythic}
          name="current-mythic"
          label={t("current-mythic")}
          onChange={onChange(setMythic)}
        />
        <InputField
          value={mythicP}
          name="current-mythic-p"
          label={t("current-mythic-p")}
          onChange={onChange(setMythicP)}
        />
      </Card>

      <Card>
        <CardTitle>{t("required-count-label")}</CardTitle>

        <CardValue>
          {diams > 0 ? (
            <>
              {t("required-count", { diams })}
              &nbsp;
              <Item name="diamond" size="small" />
            </>
          ) : (
            t("required-nothing")
          )}
        </CardValue>
      </Card>
    </div>
  );
};

export default EliteSummon;
