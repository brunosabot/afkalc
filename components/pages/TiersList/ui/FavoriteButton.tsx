import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import React, { useCallback, useContext } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./FavoriteButton.module.css";

interface IProps {
  listId: string;
}

const FavoriteButton: React.FC<IProps> = function FavoriteButton({ listId }) {
  const {
    actions: { setFavoritePriorityList },
    values: { favoritePriorityList },
  } = useContext(ProfileContext);
  const isFavorite = favoritePriorityList.includes(listId);

  const onFavorite = useCallback(() => {
    if (isFavorite) {
      setFavoritePriorityList(favoritePriorityList.filter((listItem) => listItem !== listId));
    } else {
      setFavoritePriorityList([...favoritePriorityList, listId]);
    }
  }, [favoritePriorityList, isFavorite, listId, setFavoritePriorityList]);

  return (
    <button
      type="button"
      onClick={onFavorite}
      className={`${styles.FavoriteButton} ${isFavorite ? styles.IsFavorite : ""}`}
    >
      <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
        <path fill="currentColor" d={isFavorite ? mdiHeart : mdiHeartOutline} />
      </svg>
    </button>
  );
};

export default FavoriteButton;
