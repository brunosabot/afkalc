import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import React, { useCallback, useContext } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./FavoritePetButton.module.css";

interface IProps {
  listId: string;
}

const FavoritePetButton: React.FC<IProps> = function FavoritePetButton({ listId }) {
  const {
    actions: { setFavoritePetList },
    values: { favoritePetList },
  } = useContext(ProfileContext);
  const isFavorite = favoritePetList.includes(listId);

  const onFavorite = useCallback(() => {
    if (isFavorite) {
      setFavoritePetList(favoritePetList.filter((listItem) => listItem !== listId));
    } else {
      setFavoritePetList([...favoritePetList, listId]);
    }
  }, [favoritePetList, isFavorite, listId, setFavoritePetList]);

  return (
    <button
      type="button"
      onClick={onFavorite}
      className={`${styles.FavoritePetButton} ${isFavorite ? styles.IsFavorite : ""}`}
    >
      <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
        <path fill="currentColor" d={isFavorite ? mdiHeart : mdiHeartOutline} />
      </svg>
    </button>
  );
};

export default FavoritePetButton;
