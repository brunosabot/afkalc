import React, { useState } from "react";
import HelpButton from "../../components/ui/button/HelpButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import CardValue from "../../components/ui/card/CardValue";
import InputField from "../../components/ui/InputField";
import { getEstimatedDiamsForSummon } from "../../lib/summon";
import useOnChangeNumber from "../../hooks/useOnChangeNumber";

interface IProps {
  [key: string]: never;
}

const EliteSummon: React.FC<IProps> = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [elite, setElite] = useState(0);
  const [eliteP, setEliteP] = useState(0);
  const [legendary, setLegendary] = useState(0);
  const [legendaryP, setLegendaryP] = useState(0);
  const [mythic, setMythic] = useState(0);
  const [mythicP, setMythicP] = useState(0);

  const diams = getEstimatedDiamsForSummon(elite, eliteP, legendary, legendaryP, mythic, mythicP);
  const onChange = useOnChangeNumber();

  return (
    <div>
      {showHelp ? (
        <Card>
          <div style={{ padding: "16px" }}>
            This tool is aimed to give you an estimation of how many diamants you will need to get
            enough hero copies to get an ascend hero
          </div>
        </Card>
      ) : null}
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>Enter your desired hero current count:</CardTitle>

        <InputField value={elite} label="Elite heroes you have" onChange={onChange(setElite)} />
        <InputField value={eliteP} label="Elite+ heroes you have" onChange={onChange(setEliteP)} />
        <InputField
          value={legendary}
          label="Legendary heroes you have"
          onChange={onChange(setLegendary)}
        />
        <InputField
          value={legendaryP}
          label="Legendary+ heroes you have"
          onChange={onChange(setLegendaryP)}
        />
        <InputField value={mythic} label="Mythic heroes you have" onChange={onChange(setMythic)} />
        <InputField
          value={mythicP}
          label="Mythic+ heroes you have"
          onChange={onChange(setMythicP)}
        />
      </Card>

      <Card>
        <CardTitle>To have enough copy for an ascend hero, you need:</CardTitle>

        <CardValue>{diams > 0 ? `≈ ${diams} diams` : "Nothing, you're good to go!"}</CardValue>
      </Card>
    </div>
  );
};

export default EliteSummon;
