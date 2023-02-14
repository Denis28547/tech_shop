import { MouseEvent, useState } from "react";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";
import { useAppDispatch } from "../../store/hooks";

import {
  openPopupSuccess,
  openPopupFailure,
} from "../../store/reducers/PopupSlice";

export const useChangeIsFavoriteHook = (
  isFavoriteData: boolean,
  itemId: string
): [boolean, () => void] => {
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = useState(isFavoriteData);

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const changeFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeFavorite(itemId)
        .unwrap()
        .then(() => {
          dispatch(openPopupSuccess("Item removed from favorites"));
        })
        .catch(() => {
          dispatch(openPopupFailure("Something unexpected happened"));
          setIsFavorite(true);
        });
    } else {
      setIsFavorite(true);
      addFavorite(itemId)
        .unwrap()
        .then(() => {
          dispatch(openPopupSuccess("Item added to favorites"));
        })
        .catch((error) => {
          dispatch(openPopupFailure(error.data.message));
          setIsFavorite(false);
        });
    }
  };

  return [isFavorite, changeFavorite];
};
