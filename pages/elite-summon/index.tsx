import { mdiHelpBox, mdiScript } from "@mdi/js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useState } from "react";
import useOnChangeNumber from "../../components/hooks/useOnChangeNumber";
import withLayoutPublicColumn from "../../components/layout/withLayoutPublicColumn";
import InputField from "../../components/ui/InputField";
import Svg from "../../components/ui/Svg";
import Item from "../../components/ui/afk/Item";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import CardValue from "../../components/ui/card/CardValue";
import { getEstimatedDiamsForSummon } from "../../lib/summon";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "elite-summon"])),
  },
});
interface IProps {
  [key: string]: never;
}

const EliteSummon: React.FC<IProps> = function EliteSummon() {
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
    <>
      <Card>
        <Head>
          <title>{`${t("common:menu.elite-summon")} - Afkalc`}</title>
          <meta name="description" content={t("help") ?? ""} />
        </Head>
        <CardTitle
          icon={mdiScript}
          action={<Svg onClick={() => setShowHelp(!showHelp)} d={mdiHelpBox} />}
        >
          {t("current-count-label")}
        </CardTitle>

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
    </>
  );
};

export default withLayoutPublicColumn(EliteSummon);
