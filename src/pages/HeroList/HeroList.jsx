import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import * as firebase from "firebase/app";
import Card from "../../components/Card";
import factions from "../../data/heroes.json";
import useFirestoreWithBackup from "../../hooks/useFirestoreWithBackup";
import HeroLine from "./HeroLine";
import FactionLine from "./FactionLine";
import ShareBanner from "./ShareBanner";
import FactionFilter from "./FactionFilter";
import TypeFilter from "./TypeFilter";
import ClassFilter from "./ClassFilter";
import RoleFilter from "./RoleFilter";

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

  return (
    <div>
      <Card>
        <ShareBanner isView={isView} />

        <FactionFilter filter={factionFilter} setFilter={setFactionFilter} imagePath="factions" />
        <TypeFilter filter={typeFilter} setFilter={setTypeFilter} imagePath="types" />
        <ClassFilter filter={classFilter} setFilter={setClassFilter} imagePath="classes" />
        <RoleFilter filter={roleFilter} setFilter={setRoleFilter} imagePath="roles" />

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
                  (roleFilter !== "" && character.role !== roleFilter)
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
        <div style={{ marginBottom: "16px" }} />
      </Card>
    </div>
  );
};

export default HeroList;
