import React, { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import * as firebase from "firebase/app";
import Card from "../../components/Card";
import factions from "../../data/heroes.json";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";

const firestore = firebase.firestore();

const HeroList = () => {
  const params = useParams();
  const isView = params.id !== undefined;
  const [viewId, setViewId] = useState();
  const [copy, setCopy] = useState(false);
  const listPath = isView ? viewId : "%ID%";
  const emptyObject = useMemo(() => ({}), []);

  const [levels, setLevels] = useFirestoreWithBackup(
    listPath,
    "hero-list",
    "levels",
    emptyObject,
    null,
    isView
  );

  const [id] = useFirestoreWithBackup("%ID%", "user", "shareId", "", nanoid(10), isView);

  useEffect(() => {
    if (isView) {
      firestore
        .collection("user")
        .where("shareId", "==", params.id)
        .get()
        .then((doc) => {
          if (doc.docs && doc.docs[0] && doc.docs[0].exists) {
            setViewId(doc.docs[0].id);
          }
        });
    }
  }, [isView, params.id]);

  const setLevel = useCallback(
    (key, field) => {
      return (e) => {
        const data = levels[key] || {};
        const newLevels = {
          ...levels,
          [key]: { ...data, [field]: parseInt(e.target.value, 10) },
        };

        setLevels(newLevels);
      };
    },
    [levels, setLevels]
  );

  const getValue = useCallback(
    (key, index) => {
      if (levels[key] === undefined) return 0;
      if (levels[key][index]) return levels[key][index];

      return 0;
    },
    [levels]
  );

  const value = id ? `https://afkalc.heycoucou.com/hero-list/${id}` : "";

  return (
    <div>
      <Card>
        {isView === false ? (
          <div style={{ fontWeight: "600", padding: "16px", position: "relative", height: "64px" }}>
            Share your hero list with the URL:
            {copy ? (
              <div style={{ position: "absolute", top: "16px", right: "16px" }}>Link copied</div>
            ) : null}
            <input
              className="hero-list__share"
              onClick={(e) => {
                e.target.select();
                document.execCommand("copy");
                setCopy(true);
                setTimeout(() => setCopy(false), 3000);
              }}
              value={value}
              readOnly
            />
          </div>
        ) : null}

        {factions.map((faction) => {
          const fileName = faction.faction.toLowerCase().replace(/[^a-z]/g, "");
          return (
            <div key={`${faction.faction}`}>
              <div className="hero-list__faction">
                <img
                  className="hero-list__faction-image"
                  src={`/${fileName}.png`}
                  alt={faction.faction}
                />
                <div className="hero-list__faction-name">{faction.faction}</div>
                <div className="hero-list__faction-label">SI</div>
                <div className="hero-list__faction-label">Inn</div>
                <div className="hero-list__faction-placeholder" />
              </div>
              <div>
                {faction.characters.map((character) => {
                  const heroFileName = character.name.toLowerCase().replace(/[^a-z]/g, "");

                  return (
                    <div key={character.id} className="hero-list__line">
                      <div className="hero-list__image-wrapper">
                        <img
                          src={`/heroes/${heroFileName}.jpg`}
                          className="hero-list__image"
                          alt={character.name}
                        />
                      </div>
                      <span className="hero-list__item-name">{character.name}</span>
                      <input
                        onChange={setLevel(character.id, "si")}
                        placeholder="SI"
                        className="hero-list__number"
                        value={getValue(character.id, "si")}
                        disabled={getValue(character.id, "ascend") < 5}
                        readOnly={isView}
                      />
                      <input
                        onChange={setLevel(character.id, "inn")}
                        placeholder="Inn"
                        className="hero-list__number"
                        value={getValue(character.id, "inn")}
                        disabled={getValue(character.id, "ascend") < 7}
                        readOnly={isView}
                      />
                      <select
                        onChange={setLevel(character.id, "ascend")}
                        className="hero-list__select"
                        value={getValue(character.id, "ascend")}
                        readOnly={isView}
                      >
                        <option value="0">-</option>
                        <option value="1">Elite</option>
                        <option value="2">Elite+</option>
                        <option value="3">Legendary</option>
                        <option value="4">Legendary+</option>
                        <option value="5">Mythic</option>
                        <option value="6">Mythic+</option>
                        <option value="7">Ascend</option>
                        <option value="8">Ascend 1*</option>
                        <option value="9">Ascend 2*</option>
                        <option value="10">Ascend 3*</option>
                        <option value="11">Ascend 4*</option>
                        <option value="12">Ascend 5*</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default HeroList;
