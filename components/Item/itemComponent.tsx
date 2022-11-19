import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

import ItemStyle from "./ItemStyle";
import ItemWideStyle from "./ItemWideStyle";
import { IItem } from "../../store/redux_types";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";

interface IItemComponent {
  item: IItem;
  isWide: boolean;
}

const ItemComponent = ({ item, isWide }: IItemComponent) => {
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

  const removeFromFavorites = (e: MouseEvent) => {
    e.stopPropagation();
    removeFavorite(item.id);
  };

  return (
    <>
      {isWide ? (
        <ItemWideStyle
          item_image={item_image}
          item={item}
          fullDate={fullDate}
          isFavorite={true}
          removeFromFavorites={removeFromFavorites}
          handleOpenFullItem={handleOpenFullItem}
        />
      ) : (
        <ItemStyle
          item_image={item_image}
          item={item}
          fullDate={fullDate}
          isFavorite={true}
          removeFromFavorites={removeFromFavorites}
          handleOpenFullItem={handleOpenFullItem}
        />
      )}
    </>
  );
};

export default ItemComponent;
