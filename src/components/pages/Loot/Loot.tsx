import dayjs from "dayjs";
import i18n from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import HelpButton from "../../ui/button/HelpButton";
import Card from "../../ui/card/Card";
import CardTitle from "../../ui/card/CardTitle";
import InputField from "../../ui/InputField";
import useChestLevel from "./components/hooks/useChestLevel";
import Chest from "./components/ui/Chest";
import PassNowLabel from "./components/ui/PassNowLabel";

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

  const {t} = useTranslation("loot");
  const chests = useChestLevel(level);
  const passLabel = <PassNowLabel setPass={setPass} />;
  const isDateInvalid = Number.isNaN(new Date(pass).getTime());

  return (
    <div>
      {showHelp ? (
        <Card>
          <div style={{ padding: "16px" }}>{t("help")}</div>
        </Card>
      ) : null}
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("form-title")}</CardTitle>
        <InputField value={level} label={t("label-campaign-level")} onChange={setLevel} />
        <InputField value={pass} label={passLabel} onChange={setPass} />
      </Card>

      <Card>
        <CardTitle>{t("result-title")}</CardTitle>

        {isDateInvalid
          ? null
          : chests.map((chest) => <Chest key={chest.Content} pass={pass} chest={chest} />)}
      </Card>
    </div>
  );
};

export default Loot;
