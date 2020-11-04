import firebase from "firebase/app";
import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import factions from "../../../data/heroes.json";
import HeroLevel from "../../../types/HeroLevel";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import Card from "../../ui/card/Card";
import AscendFilter from "./components/AscendFilter";
import ClassFilter from "./components/ClassFilter";
import FactionFilter from "./components/FactionFilter";
import FactionLine from "./components/FactionLine";
import HeroLine from "./components/HeroLine";
import RoleFilter from "./components/RoleFilter";
import ShareBanner from "./components/ShareBanner";
import TypeFilter from "./components/TypeFilter";

interface IHeroLevels {
  inn?: number;
  si?: number;
  ascend?: number;
}

interface IHeroes {
  [key: number]: IHeroLevels;
}

interface IProps {
  [key: string]: never;
}

const firestore = firebase.firestore();

const HeroList: React.FC<IProps> = () => {
  const params = useParams<{ id: string }>();
  const isView = params.id !== undefined;
  const [viewId, setViewId] = useState("");
  const listPath = isView ? viewId : "%ID%";
  const emptyObject = useMemo(() => ({}), []);
  const [typeFilter, setTypeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [factionFilter, setFactionFilter] = useState("");
  const [ascendFilter, setAscendFilter] = useState("");

  const [levels, setLevels] = useFirestoreWithBackup<IHeroes>(
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
    (key: number, field: HeroLevel) => {
      return (value: number) => {
        const data = levels[key] || {};
        const newLevels = {
          ...levels,
          [key]: { ...data, [field]: value },
        };

        setLevels(newLevels);
      };
    },
    [levels, setLevels]
  );

  const getValue = useCallback(
    (key: number, index: HeroLevel) => {
      if (levels[key] === undefined) return 0;
      if (levels[key][index] === undefined) return 0;
      if (levels[key][index] === 0) return 0;

      return levels[key][index] || 0;
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
                const ascendLevel = getValue(character.id, "ascend");

                if (typeFilter !== "" && character.type !== typeFilter) return null;
                if (classFilter !== "" && character.class !== classFilter) return null;
                if (roleFilter !== "" && character.role !== roleFilter) return null;

                if (ascendLevel === undefined) return null;

                if (ascendFilter === "elite" && [1, 2].includes(ascendLevel) === false) return null;
                if (ascendFilter === "legendary" && [3, 4].includes(ascendLevel) === false)
                  return null;
                if (ascendFilter === "mythic" && [5, 6].includes(ascendLevel) === false)
                  return null;
                if (ascendFilter === "mythic" && [5, 6].includes(ascendLevel) === false)
                  return null;
                if (
                  ascendFilter === "ascended" &&
                  [7, 8, 9, 10, 11, 12].includes(ascendLevel) === false
                )
                  return null;

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
