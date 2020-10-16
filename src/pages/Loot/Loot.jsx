import React, { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InputField from "../../components/InputField";
import stages from "../../data/stages.json";
import Card from "../../components/Card";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";

dayjs.extend(relativeTime);

const images = {
  "Mythic+ Stone": "MythicStone.jpg",
  "Mythic Gear": "MythicGear.jpg",
  "Faction Emblems": "GbEmblem.jpg",
  "Legendary Gear": "LegendaryGear.jpg",
  "Elite+ Gear": "ElitePGear.jpg",
  "Elite Gear": "EliteGear.jpg",
  "Invigorating Essence": "InvigoratingEssence.jpg",
  "Amplifying Emblem": "ApmEmblem.jpg",
  "Primal Emblem": "PrimEmb.jpg",
  "Dura Shards": "DuraShards.jpg",
  "Dust x1": "Dust.jpg",
};

function getDuration(time) {
  const seconds = time % 60;
  const fullMinutes = (time - seconds) / 60;
  const minutes = fullMinutes % 60;
  const fullHours = (fullMinutes - minutes) / 60;
  const hours = fullHours % 24;
  const fullDays = (fullHours - hours) / 24;

  return `${fullDays > 0 ? `${fullDays}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${
    minutes > 0 ? `${minutes}m ` : ""
  }${seconds > 0 ? `${seconds}s ` : ""}`;
}

const Loot = () => {
  const [level, setLevel] = useFirestoreWithBackup("%ID%", "campaign", "level", "1-1");
  const [pass, setPass] = useFirestoreWithBackup(
    "%ID%",
    "campaign",
    "pass",
    new Date().toLocaleString("en-US")
  );

  const chests = useMemo(() => {
    const stage = stages.find((s) => s.stage === level);
    if (stage) {
      return stage.chests
        .sort((a, b) => b.CD - a.CD)
        .map((chest) => {
          return {
            ...chest,
            image: images[chest.Content],
          };
        });
    }
    return [];
  }, [level]);

  const passLabel = (
    <span>
      Stage start date
      <button
        type="button"
        onClick={() => setPass(new Date().toLocaleString("en-US"))}
        style={{
          textDecoration: "underline",
          marginLeft: "8px",
          cursor: "pointer",
          background: "transparent",
          border: 0,
          fontFamily: "inherit",
          fontSize: "1em",
        }}
      >
        Set now
      </button>
    </span>
  );

  return (
    <div>
      <Card>
        <div style={{ fontWeight: "600", padding: "16px" }}>First, set your campaign progress</div>
        <InputField value={level} label="Campaign level" onChange={setLevel} />
        <InputField value={pass} label={passLabel} onChange={setPass} />
      </Card>

      <Card>
        <div style={{ fontWeight: "600", padding: "16px" }}>
          You will have 100% chance drop by clearing the stage for :
        </div>

        {chests.map((chest) => {
          const date = new Date(pass);
          if (Number.isNaN(new Date(pass).getTime())) {
            return null;
          }

          const obtainedDate = new Date(date.getTime() + chest.CD * 1000);
          const isOK = obtainedDate <= new Date();

          return (
            <div
              key={chest.Content}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 16px",
                alignItems: "center",
              }}
            >
              <img
                src={chest.image}
                style={{ height: "30px", width: "30px", marginRight: "8px" }}
                alt={chest.Content}
              />
              {chest.Content}
              <div style={{ textAlign: "right", flexGrow: 1 }}>
                <div style={{ opacity: 0.5 }}>{getDuration(chest.CD)}</div>
                <div style={{ fontWeight: "600" }}>
                  {isOK ? "OK" : dayjs(new Date(date.getTime() + chest.CD * 1000)).fromNow()}
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Loot;
