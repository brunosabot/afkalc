import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import React, { useCallback, useContext } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./FavoriteTreeButton.module.css";

interface IProps {
  listId: string;
}

const FavoriteTreeButton: React.FC<IProps> = function FavoriteTreeButton({ listId }) {
  const {
    actions: { setFavoriteTreeList },
    values: { favoriteTreeList },
  } = useContext(ProfileContext);
  const isFavorite = favoriteTreeList.includes(listId);

  const onFavorite = useCallback(() => {
    if (isFavorite) {
      setFavoriteTreeList(favoriteTreeList.filter((listItem) => listItem !== listId));
    } else {
      setFavoriteTreeList([...favoriteTreeList, listId]);
    }
  }, [favoriteTreeList, isFavorite, listId, setFavoriteTreeList]);

  return (
    <button
      type="button"
      onClick={onFavorite}
      className={`${styles.FavoriteTreeButton} ${isFavorite ? styles.IsFavorite : ""}`}
    >
      <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
        <path fill="currentColor" d={isFavorite ? mdiHeart : mdiHeartOutline} />
      </svg>
    </button>
  );
};

export default FavoriteTreeButton;
