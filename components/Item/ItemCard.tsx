import { MouseEvent, useState } from "react";

import ItemStyle from "./ItemStyle";
import ItemWideStyle from "./ItemWideStyle";
import { IItem, IItemWithCategory } from "../../types/index";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";

interface IItemCard {
  item: IItem | IItemWithCategory;
  isWide?: boolean;
  isFavoriteData: boolean;
}

const ItemCard = ({ item, isWide, isFavoriteData }: IItemCard) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteData);
  const item_image = `/Content/${item.images[0]}`;
  const date = new Date(item.createdAt);

  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const changeFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(item.id);
      setIsFavorite(false);
    } else {
      addFavorite(item.id);
      setIsFavorite(true);
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
