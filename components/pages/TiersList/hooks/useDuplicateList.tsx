import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../../hooks/useFirestoreCollectionReference";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";

function useDuplicateList(data: IFirebasePriorityList) {
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { t } = useTranslation("priority-list");
  const listCollection = useFirestoreCollectionReference(`priority-list`);

  return useCallback(() => {
    const duplicatedData: Partial<IFirebasePriorityList> = {
      ownerId: values.userId,
      heroes: data.heroes ?? [],
      requirement: data.requirement ?? "",
      requirementValue: data.requirementValue ?? 0,
      title: data.title ?? t("no-name"),
    };

    listCollection?.add(duplicatedData).then((docRef) => {
      router.push(`/tiers-list/${docRef.id}`);
    });
  }, [
    data.heroes,
    data.requirement,
    data.requirementValue,
    data.title,
    listCollection,
    router,
    t,
    values.userId,
  ]);
}

export default useDuplicateList;
