import { mdiPlaylistCheck } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import useFirestoreDocument from "../../../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../../../hooks/useFirestoreDocumentReference";
import IFirebasePetList from "../../../providers/types/IFirebasePetList";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Card from "../../../ui/card/Card";
import CardHelp from "../../../ui/card/CardHelp";
import CardTitle from "../../../ui/card/CardTitle";
import CardWarn from "../../../ui/card/CardWarn";
import CheckedButton from "../../TiersList/ui/CheckedButton";
import PetLineViewer from "../../TiersList/ui/PetLineViewer";

interface IProps {
  result: IFirebasePetList;
}

const PetViewer: React.FC<IProps> = function PetViewer({ result }) {
  const [showChecked, setShowChecked] = useState<boolean>(false);
  const router = useRouter();
  const profileDocument = useFirestoreDocumentReference(`profile/${router.query.member}`);
  const profileValues = useFirestoreDocument<IFirebaseProfile>(profileDocument);

  const { t } = useTranslation("priority-list");
  const listPets = result.steps.filter((pet) => pet.pet);
  const title = result?.title ?? t("no-name");

  const pets = useMemo(() => profileValues.data?.pets ?? {}, [profileValues.data?.pets]);

  const lastUpdate = useMemo(
    () => dayjs(new Date(result?.petListLastUpdate)).fromNow(),
    [result?.petListLastUpdate]
  );

  return (
    <Card>
      <CardTitle
        icon={mdiPlaylistCheck}
        action={<CheckedButton showChecked={showChecked} setShowChecked={setShowChecked} />}
      >
        {title} x {profileValues.data?.playerName}
      </CardTitle>

      {result?.petListLastUpdate !== "" ? (
        <div>
          <CardHelp>
            <div>{`${t("last-list-update")} ${lastUpdate}`}</div>
          </CardHelp>
        </div>
      ) : null}

      {showChecked ? null : <CardWarn>{t("checked-items-hidden")}</CardWarn>}

      {listPets.map((step) => (
        <PetLineViewer
          key={`${step.pet}-${step.level}`}
          step={step}
          pets={pets}
          shouldShowChecked={showChecked}
        />
      ))}
    </Card>
  );
};

export default PetViewer;
