import dayjs from "dayjs";
import Image from "next/image";
import React, { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import styles from "./FoodResume.module.css";

interface IProps {
  [key: string]: never;
}

const FoodResume: React.FC<IProps> = function FoodResume() {
  const { values } = useContext(FirebaseContext);
  // const [refresh, setRefresh] = useState<boolean>(false);

  const endTime = dayjs(values.abexEndtime);
  const now = dayjs();

  // useEffect(() => {
  //   const FIFTEEN_MINUTES = 1000 * 60 * 1;
  //   const intervalId = setTimeout(() => {
  //     setRefresh(!refresh);
  //   }, FIFTEEN_MINUTES);

  //   return clearTimeout(intervalId);
  // }, [refresh]);

  if (endTime.isBefore(now)) return null;

  const foodUntilTheEnd = Math.floor(endTime.diff(now, "hour", true) * 4);

  return (
    <span className={styles.FoodCount}>
      <Image src="/loot/food.png" height={24} width={24} alt="" />
      {foodUntilTheEnd}
    </span>
  );
};

export default FoodResume;
