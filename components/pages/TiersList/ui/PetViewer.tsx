import { mdiAccountSupervisor, mdiContentCopy, mdiPaw } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebasePetList from "../../../providers/types/IFirebasePetList";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardHelp from "../../../ui/card/CardHelp";
import CardTitle from "../../../ui/card/CardTitle";
import CardWarn from "../../../ui/card/CardWarn";
import useDuplicatePetList from "../hooks/useDuplicatePetList";
import CheckedButton from "./CheckedButton";
import FavoritePetButton from "./FavoritePetButton";
import PetLineViewer from "./PetLineViewer";

interface IProps {
  result: IFirebasePetList;
  listId: string;
}

const PetViewer: React.FC<IProps> = function PetViewer({ listId, result }) {
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const [showChecked, setShowChecked] = useState<boolean>(false);
  const { t } = useTranslation("priority-list");
  const onDuplicateList = useDuplicatePetList(result);

  const listSteps = result.steps.filter((step) => step.pet);
  const title = result?.title ?? t("no-name");

  const lastUpdate = useMemo(
    () => dayjs(new Date(result?.petListLastUpdate)).fromNow(),
    [result?.petListLastUpdate]
  );

  return (
    <Card>
      <CardTitle
        icon={mdiPaw}
        action={
          <>
            <CheckedButton showChecked={showChecked} setShowChecked={setShowChecked} />
            <FavoritePetButton listId={listId} />
          </>
        }
      >
        {title}
      </CardTitle>
      {result?.petListLastUpdate !== "" ? (
        <div>
          <CardHelp>{`${t("last-update")} ${lastUpdate}`}</CardHelp>
        </div>
      ) : null}

      {showChecked ? null : <CardWarn>{t("checked-items-hidden")}</CardWarn>}

      {listSteps.map((step) => (
        <PetLineViewer
          key={`${step.pet}-${step.level}`}
          step={step}
          pets={values.pets}
          shouldShowChecked={showChecked}
        />
      ))}
      <CardActions>
        <CardAction icon={mdiContentCopy} onClick={onDuplicateList}>
          {t("label-duplicate")}
        </CardAction>
        <CardAction
          icon={mdiAccountSupervisor}
          onClick={() => router.push(`/guild/tiers-list/pet/${router.query.id}`)}
        >
          {t("label-see-guild")}
        </CardAction>
      </CardActions>
    </Card>
  );
};

export default PetViewer;
