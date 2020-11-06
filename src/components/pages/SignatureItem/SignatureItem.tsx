import i18n from "i18next";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import HelpButton from "../../ui/button/HelpButton";
import Card from "../../ui/card/Card";
import CardTitle from "../../ui/card/CardTitle";
import InputField from "../../ui/InputField";
import useCountEmblem from "./components/hooks/useCountEmblem";
import SignatureItemLeft from "./components/ui/SignatureItemLeft";

i18n.loadNamespaces("signature-item");

interface IProps {
  [key: string]: never;
}

const SignatureItem: React.FC<IProps> = () => {
  const {t} = useTranslation("signature-item");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const [primordial10, amplifying10, faction10, celest10] = useCountEmblem(10, currentLevel);
  const [primordial20, amplifying20, faction20, celest20] = useCountEmblem(20, currentLevel);
  const [primordial30, amplifying30, faction30, celest30] = useCountEmblem(30, currentLevel);
  const [primordial40, amplifying40, faction40, celest40] = useCountEmblem(40, currentLevel);

  const onChange = useCallback((e) => {
    const val = Number(e);
    if (!Number.isNaN(val) && val >= 0 && val <= 40) {
      setCurrentLevel(val);
    }
  }, []);

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
        <InputField value={currentLevel} label={t("label-current-si")} onChange={onChange} />
      </Card>

      <SignatureItemLeft
        step={40}
        primordial={primordial40}
        amplifying={amplifying40}
        faction={faction40}
        celest={celest40}
      />
      <SignatureItemLeft
        step={30}
        primordial={primordial30}
        amplifying={amplifying30}
        faction={faction30}
        celest={celest30}
      />
      <SignatureItemLeft
        step={20}
        primordial={primordial20}
        amplifying={amplifying20}
        faction={faction20}
        celest={celest20}
      />
      <SignatureItemLeft
        step={10}
        primordial={primordial10}
        amplifying={amplifying10}
        faction={faction10}
        celest={celest10}
      />
    </div>
  );
};

export default SignatureItem;
