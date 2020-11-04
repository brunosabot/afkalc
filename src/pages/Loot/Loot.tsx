import React, { useState } from "react";
import InputField from "../../components/ui/InputField";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import Chest from "./components/ui/Chest";
import useChestLevel from "./components/hooks/useChestLevel";
import PassNowLabel from "./components/ui/PassNowLabel";
import HelpButton from "../../components/ui/button/HelpButton";

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
    new Date().toLocaleString("en-US")
  );

  const chests = useChestLevel(level);
  const passLabel = <PassNowLabel setPass={setPass} />;
  const isDateInvalid = Number.isNaN(new Date(pass).getTime());

  return (
    <div>
      {showHelp ? (
        <Card>
          <div style={{ padding: "16px" }}>
            When you wait long enough before passing a level, you can ensure having some loots. By
            having your campaign level and the last success date, you will have the timing for the
            next loot you need.
          </div>
        </Card>
      ) : null}
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>First, set your campaign progress</CardTitle>
        <InputField value={level} label="Campaign level" onChange={setLevel} />
        <InputField value={pass} label={passLabel} onChange={setPass} />
      </Card>

      <Card>
        <CardTitle>You will have 100% chance drop by clearing the stage for :</CardTitle>

        {isDateInvalid
          ? null
          : chests.map((chest) => <Chest key={chest.Content} pass={pass} chest={chest} />)}
      </Card>
    </div>
  );
};

export default Loot;
