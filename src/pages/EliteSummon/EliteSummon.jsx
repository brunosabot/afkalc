import React, { useState } from "react";
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

  return (
    <div>
      <InputField type="number" value={elite} label="Elite" onChange={(e) => setElite(Number(e))} />
      <InputField
        type="number"
        value={eliteP}
        label="Elite+"
        onChange={(e) => setEliteP(Number(e))}
      />
      <InputField
        type="number"
        value={legendary}
        label="Legendary"
        onChange={(e) => setLegendary(Number(e))}
      />
      <InputField
        type="number"
        value={legendaryP}
        label="Legendary+"
        onChange={(e) => setLegendaryP(Number(e))}
      />
      <InputField
        type="number"
        value={mythic}
        label="Mythic"
        onChange={(e) => setMythic(Number(e))}
      />
      <InputField
        type="number"
        value={mythicP}
        label="Mythic+"
        onChange={(e) => setMythicP(Number(e))}
      />

      <div style={{ fontWeight: 900, padding: "16px" }}>
        {got < 8 ? `≈ ${Math.round(diamCost * luck * (8 - got))} diams` : "Good to go!"}
      </div>
    </div>
  );
};

export default EliteSummon;
