import { mdiChevronTripleUp } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import Item from "../../../ui/afk/Item";
import Card from "../../../ui/card/Card";
import CardTitle from "../../../ui/card/CardTitle";
import FlexGap from "../../../ui/list/FlexGap";

interface IProps {
  step: number;
  primordial: number;
  amplifying: number;
  faction: number;
  celest: number;
}

const SignatureItemLeft: React.FC<IProps> = function SignatureItemLeft({
  step,
  primordial,
  amplifying,
  faction,
  celest,
}) {
  const { t } = useTranslation("signature-item");

  if (primordial === 0 && amplifying === 0 && faction === 0 && celest === 0) {
    return null;
  }

  return (
    <Card>
      <CardTitle icon={mdiChevronTripleUp}>{t("label-si", { si: step })}</CardTitle>
      <FlexGap gap={16}>
        {primordial > 0 ? <Item count={primordial} size="large" name="primordial-emblem" /> : null}
        {amplifying > 0 ? <Item count={amplifying} size="large" name="amplifying-emblem" /> : null}
        {faction > 0 ? <Item count={faction} size="large" name="faction-emblem" /> : null}
        {celest > 0 ? <Item count={celest} size="large" name="chad-emblem" /> : null}
      </FlexGap>
    </Card>
  );
};

export default SignatureItemLeft;
