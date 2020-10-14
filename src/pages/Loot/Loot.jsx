import React, { useCallback, useMemo, useState } from "react";
import InputField from "../../components/InputField";
import stages from "../../data/stages.json";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Card from "../../components/Card";
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
  const [level, _setLevel] = useState(localStorage.getItem("campaign.level") || "1-1");
  const [pass, _setPass] = useState(
    localStorage.getItem("campaign.pass") || new Date().toLocaleString("en-US")
  );

  const setLevel = useCallback((value) => {
    localStorage.setItem("campaign.level", value);
    _setLevel(value);
  }, []);

  const setPass = useCallback((value) => {
    localStorage.setItem("campaign.pass", value);
    _setPass(value);
  }, []);

  const chests = useMemo(() => {
    const stage = stages.find((stage) => stage.stage === level);
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

  return (
    <div>
      <Card>
        <div style={{ fontWeight: "600", padding: "16px" }}>First, set your campaign progress</div>
        <InputField value={level} label="Campaign level" onChange={setLevel} />
        <InputField
          value={pass}
          label={
            <span>
              Stage start date
              <span
                onClick={() => setPass(new Date().toLocaleString("en-US"))}
                style={{ textDecoration: "underline", marginLeft: "8px", cursor: "pointer" }}
              >
                Set now
              </span>
            </span>
          }
          onChange={setPass}
        />
      </Card>

      <Card>
        <div style={{ fontWeight: "600", padding: "16px" }}>
          You will have 100% chance drop by clearing the stage for :
        </div>

        {chests.map((chest) => {
          const date = new Date(pass);
          if (isNaN(new Date(pass).getTime())) {
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
              {chest.Content}:
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
