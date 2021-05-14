import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../../hooks/useFirestoreCollectionReference";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebaseTreeList from "../../../providers/types/IFirebaseTreeList";

function useDuplicateTreeList(data: IFirebaseTreeList) {
  const router = useRouter();
  const { values } = useContext(ProfileContext);
  const { t } = useTranslation("priority-list");
  const listCollection = useFirestoreCollectionReference(`tree-list`);

  return useCallback(() => {
    const duplicatedData: Partial<IFirebaseTreeList> = {
      ownerId: values.userId,
      steps: data.steps ?? [],
      title: data.title ?? t("no-name"),
    };

    listCollection?.add(duplicatedData).then((docRef) => {
      router.push(`/tiers-list/tree/${docRef.id}`);
    });
  }, [data.steps, data.title, listCollection, router, t, values.userId]);
}

export default useDuplicateTreeList;
