import { useContext, useEffect } from "react";
import { FirebaseContext } from "../FirebaseProvider";
import migrate from "../migration";

export default function useMigration(result: any) {
  const { values } = useContext(FirebaseContext);

  useEffect(() => {
    if (result.status === "success") {
      migrate(result?.data?.version, values.uid);
    }
  }, [result?.data?.version, result.status, values.uid]);
}
