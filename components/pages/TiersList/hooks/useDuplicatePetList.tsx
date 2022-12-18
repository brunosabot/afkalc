import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../../hooks/useFirestoreCollectionReference";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebasePetList from "../../../providers/types/IFirebasePetList";

function useDuplicatePetList(data: IFirebasePetList) {
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { t } = useTranslation("priority-list");
  const listCollection = useFirestoreCollectionReference(`pet-list`);

  return useCallback(() => {
    const duplicatedData: Partial<IFirebasePetList> = {
      ownerId: values.userId,
      steps: data.steps ?? [],
      title: data.title ?? t("no-name"),
    };

    listCollection?.add(duplicatedData).then((docRef) => {
      router.push(`/tiers-list/pet/${docRef.id}`);
    });
  }, [data.steps, data.title, listCollection, router, t, values.userId]);
}

export default useDuplicatePetList;
