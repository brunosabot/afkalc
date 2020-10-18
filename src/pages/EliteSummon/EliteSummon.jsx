import React, { useCallback, useState } from "react";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import CardValue from "../../components/ui/card/CardValue";
import InputField from "../../components/ui/InputField";
import { getEstimatedDiamsForSummon } from "../../lib/summon";

const EliteSummon = () => {
  const [elite, setElite] = useState(0);
  const [eliteP, setEliteP] = useState(0);
  const [legendary, setLegendary] = useState(0);
  const [legendaryP, setLegendaryP] = useState(0);
  const [mythic, setMythic] = useState(0);
  const [mythicP, setMythicP] = useState(0);

  const diams = getEstimatedDiamsForSummon(elite, eliteP, legendary, legendaryP, mythic, mythicP);

  const onChange = useCallback((setter) => {
    return (e) => {
      const val = Number(e);
      if (!Number.isNaN(val) && val >= 0) {
        setter(val);
      }
    };
  }, []);

  return (
    <div>
      <Card>
        <CardTitle>First, enter the hero copy you already have:</CardTitle>

        <InputField value={elite} label="Elite" onChange={onChange(setElite)} />
        <InputField value={eliteP} label="Elite+" onChange={onChange(setEliteP)} />
        <InputField value={legendary} label="Legendary" onChange={onChange(setLegendary)} />
        <InputField value={legendaryP} label="Legendary+" onChange={onChange(setLegendaryP)} />
        <InputField value={mythic} label="Mythic" onChange={onChange(setMythic)} />
        <InputField value={mythicP} label="Mythic+" onChange={onChange(setMythicP)} />
      </Card>

      <Card>
        <CardTitle>To have enough copy for an ascend hero, you need:</CardTitle>

        <CardValue>{diams > 0 ? `≈ ${diams} diams` : "Nothing, you're good to go!"}</CardValue>
      </Card>
    </div>
  );
};

export default EliteSummon;
