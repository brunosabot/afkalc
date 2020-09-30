import React, { useState } from "react";
import useCountEmblem from "./useCountEmblem";
import SignatureItemLeft from "./SignatureItemLeft";
import InputField from "../../components/InputField";

const SignatureItem = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const [primoridal10, amplifying10, faction10, celest10] = useCountEmblem(10, currentLevel);
  const [primoridal20, amplifying20, faction20, celest20] = useCountEmblem(20, currentLevel);
  const [primoridal30, amplifying30, faction30, celest30] = useCountEmblem(30, currentLevel);
  const [primoridal40, amplifying40, faction40, celest40] = useCountEmblem(40, currentLevel);

  return (
    <div>
      <InputField
        type="number"
        value={currentLevel}
        label="Current SI level"
        onChange={(e) => setCurrentLevel(Number(e))}
      />

      <SignatureItemLeft
        step={40}
        primoridal={primoridal40}
        amplifying={amplifying40}
        faction={faction40}
        celest={celest40}
      />
      <SignatureItemLeft
        step={30}
        primoridal={primoridal30}
        amplifying={amplifying30}
        faction={faction30}
        celest={celest30}
      />
      <SignatureItemLeft
        step={20}
        primoridal={primoridal20}
        amplifying={amplifying20}
        faction={faction20}
        celest={celest20}
      />
      <SignatureItemLeft
        step={10}
        primoridal={primoridal10}
        amplifying={amplifying10}
        faction={faction10}
        celest={celest10}
      />
    </div>
  );
};

export default SignatureItem;
