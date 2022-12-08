import ItemCard from "./ItemCard";
import ItemSkeleton, { templatesFn } from "./ItemSkeleton";
import { IItem, IItemWithCategory } from "../../types/index";

import styles from "../../styles/item/ItemWrapper.module.scss";

interface IItemsGridCard {
  isItemsLoading: boolean;
  itemsData: IItem[] | IItemWithCategory[] | [] | undefined;

  favoritesData: string[] | undefined;
  gridLayout?: "overflow" | "normal";
}

const ItemsGridCard = ({
  isItemsLoading,
  itemsData,

  favoritesData,
  gridLayout = "normal",
}: IItemsGridCard) => {
  const itemTemplates = templatesFn();

  if (isItemsLoading || !itemsData) {
    return (
      <div
        className={`${
          gridLayout === "normal"
            ? styles.item_wrapper_grid
            : styles.grid_horizontal_overflow
        }`}
      >
        {itemTemplates.map((_, index) => (
          <ItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${
        gridLayout === "normal"
          ? styles.item_wrapper_grid
          : styles.grid_horizontal_overflow
      }`}
    >
      {itemsData.map((item) => {
        let isFavorite = false;
        if (favoritesData && favoritesData.includes(item.id)) isFavorite = true;
        return (
          <ItemCard key={item.id} item={item} isFavoriteData={isFavorite} />
        );
      })}
    </div>
  );
};

export default ItemsGridCard;
