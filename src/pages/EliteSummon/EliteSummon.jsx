import React, { useCallback, useState } from "react";
import InputField from "../../components/InputField";

const EliteSummon = () => {
  const [elite, setElite] = useState(0);
  const [eliteP, setEliteP] = useState(0);
  const [legendary, setLegendary] = useState(0);
  const [legendaryP, setLegendaryP] = useState(0);
  const [mythic, setMythic] = useState(0);
  const [mythicP, setMythicP] = useState(0);

  const got = elite + eliteP * 2 + legendary * 2 + legendaryP * 4 + mythic * 4 + mythicP * 4;
  const p = 0.0461;
  const diamCost = 300;
  const assuredTry = 30;
  const luck = 1 / p - (1 / p) * Math.pow(1 - p, assuredTry);

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
      <InputField value={elite} label="Elite" onChange={onChange(setElite)} />
      <InputField value={eliteP} label="Elite+" onChange={onChange(setEliteP)} />
      <InputField value={legendary} label="Legendary" onChange={onChange(setLegendary)} />
      <InputField value={legendaryP} label="Legendary+" onChange={onChange(setLegendaryP)} />
      <InputField value={mythic} label="Mythic" onChange={onChange(setMythic)} />
      <InputField value={mythicP} label="Mythic+" onChange={onChange(setMythicP)} />

      <div style={{ fontWeight: 900, padding: "16px" }}>
        {got < 8 ? `≈ ${Math.round(diamCost * luck * (8 - got))} diams` : "Good to go!"}
      </div>
    </div>
  );
};

export default EliteSummon;
