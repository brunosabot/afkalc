import dayjs from "dayjs";
import i18n from "i18next";
import Head from "next/head";
import React, { useState } from "react";
import useFirestoreWithBackup from "../../components/hooks/useFirestoreWithBackup";
import useChestLevel from "../../components/pages/Loot/hooks/useChestLevel";
import Chest from "../../components/pages/Loot/ui/Chest";
import PassNowLabel from "../../components/pages/Loot/ui/PassNowLabel";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import InputField from "../../components/ui/InputField";
import { useTranslation } from "../../i18n";

i18n.loadNamespaces("loot");

interface IProps {
  [key: string]: never;
}

const Loot: React.FC<IProps> = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [level, setLevel] = useFirestoreWithBackup("%ID%", "campaign", "level", "1-1");
  const [pass, setPass] = useFirestoreWithBackup(
    "%ID%",
    "campaign",
    "pass",
    dayjs().format("L LTS")
  );

  const { t } = useTranslation("loot");
  const chests = useChestLevel(level);
  const passLabel = <PassNowLabel setPass={setPass} />;
  const isDateInvalid = dayjs(pass, "L LTS").isValid() === false;

  return (
    <div style={{ paddingTop: "8px" }}>
      <Card>
        <Head>
          <title>{`${t("common:menu.loot")} - Afkalc`}</title>
          <meta name="description" content={t("help")} />
        </Head>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("form-title")}</CardTitle>

        {showHelp ? <CardHelp>{t("help")}</CardHelp> : null}

        <InputField
          name="level"
          value={level}
          label={t("label-campaign-level")}
          onChange={setLevel}
        />
        <InputField name="pass" value={pass} label={passLabel} onChange={setPass} />
      </Card>

      <Card>
        <CardTitle>{t("result-title")}</CardTitle>

        {isDateInvalid
          ? null
          : chests.map((chest) => <Chest key={chest.item} pass={pass} chest={chest} />)}
      </Card>
    </div>
  );
};

export default Loot;
