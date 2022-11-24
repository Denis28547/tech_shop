import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

import ItemStyle from "./ItemStyle";
import ItemWideStyle from "./ItemWideStyle";
import { IItem } from "../../store/redux_types";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";

interface IItemCard {
  item: IItem;
  isWide?: boolean;
  isFavoriteData: boolean;
}

const ItemCard = ({ item, isWide, isFavoriteData }: IItemCard) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteData);
  const item_image = `/Content/${item.images[0]}`;
  const date = new Date(item.createdAt);
  const router = useRouter();

  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const handleOpenFullItem = () => {
    router.push(`/itemPage/${item.id}`);
  };

  const [addFavorite, addThings] = useAddFavoriteMutation();
  const [removeFavorite, removeThings] = useRemoveFavoriteMutation();

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
          item={item}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
          handleOpenFullItem={handleOpenFullItem}
        />
      ) : (
        <ItemStyle
          item_image={item_image}
          item={item}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
          handleOpenFullItem={handleOpenFullItem}
        />
      )}
    </>
  );
};

export default ItemCard;
