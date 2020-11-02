import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import Card from "../../components/ui/card/Card";
import factions from "../../data/heroes.json";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import HeroLine from "./components/HeroLine";
import FactionLine from "./components/FactionLine";
import ShareBanner from "./components/ShareBanner";
import FactionFilter from "./components/FactionFilter";
import TypeFilter from "./components/TypeFilter";
import ClassFilter from "./components/ClassFilter";
import RoleFilter from "./components/RoleFilter";
import AscendFilter from "./components/AscendFilter";

const firestore = firebase.firestore();

const HeroList = () => {
  const params = useParams();
  const isView = params.id !== undefined;
  const [viewId, setViewId] = useState();
  const listPath = isView ? viewId : "%ID%";
  const emptyObject = useMemo(() => ({}), []);
  const [typeFilter, setTypeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [factionFilter, setFactionFilter] = useState("");
  const [ascendFilter, setAscendFilter] = useState("");

  const [levels, setLevels] = useFirestoreWithBackup(
    listPath,
    "hero-list",
    "levels",
    emptyObject,
    null,
    isView
  );

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
          [key]: { ...data, [field]: parseInt(e.target.value || "0", 10) },
        };

        setLevels(newLevels);
      };
    },
    [levels, setLevels]
  );

  const getValue = useCallback(
    (key, index) => {
      if (levels[key] === undefined) return "";
      if (levels[key][index] === undefined) return "";
      if (levels[key][index] === 0) return "";

      return levels[key][index];
    },
    [levels]
  );

  return (
    <Card>
      <div style={{ marginBottom: "16px" }}>
        <ShareBanner isView={isView} />

        <FactionFilter filter={factionFilter} setFilter={setFactionFilter} imagePath="factions" />
        <TypeFilter filter={typeFilter} setFilter={setTypeFilter} imagePath="types" />
        <ClassFilter filter={classFilter} setFilter={setClassFilter} imagePath="classes" />
        <RoleFilter filter={roleFilter} setFilter={setRoleFilter} imagePath="roles" />
        <AscendFilter filter={ascendFilter} setFilter={setAscendFilter} imagePath="ascend" />

        {factions.map((faction) => {
          if (factionFilter !== "" && faction.faction !== factionFilter) {
            return null;
          }

          return (
            <Fragment key={`${faction.faction}`}>
              <FactionLine name={faction.faction} />
              {faction.characters.map((character) => {
                if (
                  (typeFilter !== "" && character.type !== typeFilter) ||
                  (classFilter !== "" && character.class !== classFilter) ||
                  (roleFilter !== "" && character.role !== roleFilter) ||
                  (ascendFilter !== "" &&
                    ascendFilter === "elite" &&
                    [1, 2].includes(getValue(character.id, "ascend")) === false) ||
                  (ascendFilter !== "" &&
                    ascendFilter === "legendary" &&
                    [3, 4].includes(getValue(character.id, "ascend")) === false) ||
                  (ascendFilter !== "" &&
                    ascendFilter === "mythic" &&
                    [5, 6].includes(getValue(character.id, "ascend")) === false) ||
                  (ascendFilter !== "" &&
                    ascendFilter === "ascended" &&
                    [7, 8, 9, 10, 11, 12].includes(getValue(character.id, "ascend")) === false)
                ) {
                  return null;
                }

                return (
                  <HeroLine
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    setLevel={setLevel}
                    getValue={getValue}
                    isView={isView}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </Card>
  );
};

export default HeroList;
