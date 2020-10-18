import React from "react";
import InputField from "../../components/ui/InputField";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import Chest from "./components/ui/Chest";
import useChestLevel from "./components/hooks/useChestLevel";
import PassNowLabel from "./components/ui/PassNowLabel";

const Loot = () => {
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
      <Card>
        <CardTitle>First, set your campaign progress</CardTitle>
        <InputField value={level} label="Campaign level" onChange={setLevel} />
        <InputField value={pass} label={passLabel} onChange={setPass} />
      </Card>

      <Card>
        <CardTitle>You will have 100% chance drop by clearing the stage for :</CardTitle>

        {isDateInvalid ? null : chests.map((chest) => <Chest pass={pass} chest={chest} />)}
      </Card>
    </div>
  );
};

export default Loot;
