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

import ItemStyle from "./ItemStyle";
import ItemWideStyle from "./ItemWideStyle";
import { IItem, IItemWithCategory } from "../../types/index";

interface IItemCard {
  item: IItem | IItemWithCategory;
  isWide?: boolean;
  isFavoriteData: boolean;
  isEditable?: boolean;
}

const ItemCard = ({ item, isWide, isFavoriteData, isEditable }: IItemCard) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(isFavoriteData);

  const item_image = `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/${item.images[0]}`;

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
          dispatch(openPopupSuccess("Item removed from favorites"));
        })
        .catch(() => {
          dispatch(openPopupFailure("Something unexpected happened"));
          setIsFavorite(true);
        });
    } else {
      setIsFavorite(true);
      addFavorite(item.id)
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

  return (
    <>
      {isWide ? (
        <ItemWideStyle
          item_image={item_image}
          item={item as IItemWithCategory}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
          isEditable={isEditable}
        />
      ) : (
        <ItemStyle
          item_image={item_image}
          item={item}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
          isEditable={isEditable}
        />
      )}
    </>
  );
};

export default ItemCard;
