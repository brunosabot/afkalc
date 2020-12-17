import Head from "next/head";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useCountEmblem from "../../components/pages/SignatureItem/hooks/useCountEmblem";
import SignatureItemLeft from "../../components/pages/SignatureItem/ui/SignatureItemLeft";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardHelp from "../../components/ui/card/CardHelp";
import CardTitle from "../../components/ui/card/CardTitle";
import InputField from "../../components/ui/InputField";

interface IProps {
  [key: string]: never;
}

const SignatureItem: React.FC<IProps> = () => {
  const { t } = useTranslation("signature-item");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [targetLevel, setTargetLevel] = useState(40);
  const [showHelp, setShowHelp] = useState(false);

  const twenty = useCountEmblem(20, currentLevel);
  const thirty = useCountEmblem(30, currentLevel);
  const target = useCountEmblem(targetLevel, currentLevel);

  const onChange = useCallback(
    (setter) => (e: string) => {
      const val = Number(e);
      if (!Number.isNaN(val) && val >= 0 && val <= 40) {
        setter(val);
      }
    },
    []
  );

  const levels = Array.from(new Set([20, 30, targetLevel]));

  return (
    <div style={{ paddingTop: "8px" }}>
      <Card>
        <Head>
          <title>{`${t("common:menu.signature-item")} - Afkalc`}</title>
          <meta name="description" content={t("help")} />
        </Head>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>{t("form-title")}</CardTitle>

        {showHelp ? <CardHelp>{t("help")}</CardHelp> : null}

        <InputField
          name="current-si"
          value={currentLevel}
          label={t("label-current-si")}
          onChange={onChange(setCurrentLevel)}
        />
        <InputField
          name="target-si"
          value={targetLevel}
          label={t("label-target-si")}
          onChange={onChange(setTargetLevel)}
        />
      </Card>

      {levels
        .sort((a, b) => b - a)
        .map((level) => {
          const [primordial, amplifying, faction, celest] = {
            20: twenty,
            30: thirty,
            [targetLevel]: target,
          }[level];

          return (
            <SignatureItemLeft
              key={level}
              step={level}
              primordial={primordial}
              amplifying={amplifying}
              faction={faction}
              celest={celest}
            />
          );
        })}
    </div>
  );
};

export default SignatureItem;
