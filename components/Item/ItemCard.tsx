import { MouseEvent, useState } from "react";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";
import { useAppDispatch } from "../../store/hooks";
import {
  // openPopup,
  setSuccessText,
  setFailedText,
} from "../../store/reducers/PopupSlice";

import ItemStyle from "./ItemStyle";
import ItemWideStyle from "./ItemWideStyle";
import { IItem, IItemWithCategory } from "../../types/index";

interface IItemCard {
  item: IItem | IItemWithCategory;
  isWide?: boolean;
  isFavoriteData: boolean;
}

const ItemCard = ({ item, isWide, isFavoriteData }: IItemCard) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(isFavoriteData);
  const item_image = `${process.env.NEXT_PUBLIC_FILEPATH_TO_USER_ITEM_IMAGES}${item.images[0]}`;
  const date = new Date(item.createdAt);

  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const changeFavorite = (e: MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      setIsFavorite(false);
      removeFavorite(item.id)
        .unwrap()
        .then(() => {
          dispatch(setSuccessText("Item removed from favorites"));
        })
        .catch(() => {
          dispatch(setFailedText("Something unexpected happened"));
          setIsFavorite(true);
        });
    } else {
      setIsFavorite(true);
      addFavorite(item.id)
        .unwrap()
        .then(() => {
          dispatch(setSuccessText("Item added to favorites"));
        })
        .catch((error) => {
          dispatch(setFailedText(error.data.message));
          setIsFavorite(false);
        });
    }
  };

  return (
    <>
      {isWide ? (
        <ItemWideStyle
          item_image={item_image}
          item={item as IItemWithCategory}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
        />
      ) : (
        <ItemStyle
          item_image={item_image}
          item={item}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
        />
      )}
    </>
  );
};

export default ItemCard;
