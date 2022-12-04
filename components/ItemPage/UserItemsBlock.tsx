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
    <>
      <div className={styles.user_items_top_flex}>
        <h2>Other items from this user</h2>
        <h3>all items</h3>
      </div>

      <ItemsGridCard
        isItemsLoading={isItemsLoading}
        itemsData={itemsData}
        isFavoritesLoading={isFavoritesLoading}
        favoritesData={favoritesData}
        gridLayout="overflow"
      />
    </>
  );
};

export default UserItemsBlock;
