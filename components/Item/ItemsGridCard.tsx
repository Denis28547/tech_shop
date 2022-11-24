import ItemCard from "./ItemCard";
import ItemSkeleton, { templatesFn } from "./ItemSkeleton";
import { useGetAllItemsQuery } from "../../store/services/ItemService";
import { useGetFavoritesIdQuery } from "../../store/services/FavoritesService";

import styles from "../../styles/item/ItemGridComponent.module.scss";

const ItemsGridCard = () => {
  const { isLoading: isItemsLoading, data: itemsData } =
    useGetAllItemsQuery(24);
  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetFavoritesIdQuery();

  const itemTemplates = templatesFn();

  if (isItemsLoading || isFavoritesLoading || !itemsData) {
    return (
      <div className={styles.grid}>
        {itemTemplates.map((_, index) => (
          <ItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
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
