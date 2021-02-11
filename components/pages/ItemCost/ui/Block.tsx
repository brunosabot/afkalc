import { mdiPlus } from "@mdi/js";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseItem from "../../../modal/ChooseItem";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import ResourceDetail from "./ResourceDetail";

interface IProps {
  values: { [key: string]: number },
  setValues:(values: { [key: string]: number })=>void
}

const Block: React.FC<IProps> = ({
  values,
  setValues
}) => {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      {Object.entries(values).map(([key, value]) => (
        <ResourceDetail
          key={key}
          value={value}
          onSelect={(item) => {
              const newItem = { ...values };
              delete newItem[key];
              setValues({ ...newItem, [item]: 0 });
            }}
          onDelete={() => {
            const newItem = { ...values };
            delete newItem[key];
            setValues(newItem);
          }}
          onValue={(v) => setValues({ ...values, [key]: parseInt(v, 10) })}
          resource={key}
          side={1}
        />
      ))}
      {Object.entries(values).length ? <div style={{paddingTop: "8px"}} />:null}

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseItem
          current=""
          onSelect={(itemId) => {
            setValues({ ...values, [itemId]: 0 });
            setShowModal(false);
          }}
        />
      </Modal>

      <CardActions>
        <CardAction onClick={() => setShowModal(true)} icon={mdiPlus}>Ajouter</CardAction>
      </CardActions>
    </>
  );
}

export default Block;
