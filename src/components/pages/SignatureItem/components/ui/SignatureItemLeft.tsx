import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../../ui/card/Card";
import EmblemChip from "./EmblemChip";

interface IProps {
  step: number;
  primordial: number;
  amplifying: number;
  faction: number;
  celest: number;
}

const SignatureItemLeft: React.FC<IProps> = ({ step, primordial, amplifying, faction, celest }) => {
  const { t } = useTranslation("signature-item");

  if (primordial === 0 && amplifying === 0 && faction === 0 && celest === 0) {
    return null;
  }

  return (
    <Card>
      <div className="emblem-count__block">
        <div className="emblem-count__title">{t("label-si", { si: step })}</div>
        <EmblemChip
          count={primordial}
          image="/emblem/PrimEmb.jpg"
          name={t("item-primordial-emblem")}
        />
        <EmblemChip
          count={amplifying}
          image="/emblem/ApmEmblem.jpg"
          name={t("item-amplifying-emblem")}
        />
        <EmblemChip count={faction} image="/emblem/GbEmblem.jpg" name={t("item-faction-emblem")} />
        <EmblemChip
          count={celest}
          image="/emblem/CeleEmb.jpg"
          name={t("item-celest-Hypogean-emblem")}
        />
      </div>
    </Card>
  );
};

export default SignatureItemLeft;
