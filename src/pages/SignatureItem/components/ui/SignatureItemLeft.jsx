import React from "react";
import Card from "../../../../components/ui/card/Card";
import EmblemChip from "./EmblemChip";

const SignatureItemLeft = ({ step, primoridial, amplifying, faction, celest }) => {
  if (primoridial === 0 && amplifying === 0 && faction === 0 && celest === 0) {
    return null;
  }

  return (
    <Card>
      <div className="emblem-count__block">
        <div className="emblem-count__title">{`SI +${step}`}</div>
        <EmblemChip count={primoridial} image="/PrimEmb.jpg" name="Primoridial emblem" />
        <EmblemChip count={amplifying} image="/ApmEmblem.jpg" name="Amplifying emblem" />
        <EmblemChip count={faction} image="/GbEmblem.jpg" name="Faction emblem" />
        <EmblemChip count={celest} image="/CeleEmb.jpg" name="Celest/Hypogean emblem" />
      </div>
    </Card>
  );
};

export default SignatureItemLeft;
