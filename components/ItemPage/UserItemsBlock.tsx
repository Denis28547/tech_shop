import ItemsGridCard from "../Item/ItemsGridCard";
import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetAllItemsQuery } from "../../store/services/ItemService";

import styles from "../../styles/itemPage/UserItemsBlock.module.scss";

const UserItemsBlock = () => {
  const { isLoading: isItemsLoading, data: itemsData } =
    useGetAllItemsQuery(24);
  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  return (
    <div className={styles.user_items_block}>
      <ItemsGridCard
        isItemsLoading={isItemsLoading}
        itemsData={itemsData}
        isFavoritesLoading={isFavoritesLoading}
        favoritesData={favoritesData}
        gridLayout="overflow"
      />
    </div>
  );
};

export default UserItemsBlock;
