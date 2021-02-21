import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "../../../../i18n";
import useUserFirestoreCollection from "../../../hooks/useUserFirestoreCollection";
import { FirebaseContext } from "../../../providers/FirebaseProvider";
import UserContext from "../../../providers/UserContext";

interface IData {
  title?: string;
  value?: number;
  type: string;
  heroes: number[];
}

function useDuplicateList(data: IData) {
  const router = useRouter();
  const { values } = useContext(FirebaseContext);
  const { values: userValues } = useContext(UserContext);
  const { t } = useTranslation("priority-list");
  const listCollection = useUserFirestoreCollection(`user/%ID%/priority-list`);

  const heroes = useMemo(() => data?.heroes ?? [], [data?.heroes]);
  const title = data?.title ?? t("no-name");
  const value = data?.value ?? 0;
  const type = data?.type ?? "";

  return useCallback(() => {
    const id = nanoid(11);
    listCollection?.doc(id).set({
      title: `${title} - Copy`,
      owner: values.uid,
      heroes,
      value,
      type,
    });
    router.push(`/priority-list/${userValues.shareId}/${id}`);
  }, [heroes, listCollection, router, title, type, userValues.shareId, value, values.uid]);
}

export default useDuplicateList;
