import ItemsGridCard from "../Item/ItemsGridCard";
import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetAllItemsQuery } from "../../store/services/ItemService";

import styles from "../../styles/itemPage/UserItemsBlock.module.scss";
import Link from "next/link";

const UserItemsBlock = () => {
  const { isLoading: isItemsLoading, data: itemsData } =
    useGetAllItemsQuery(24);
  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  return (
    <>
      <div className={styles.user_items_top_flex}>
        <h2>Other items from this user</h2>
        <Link href="/profile">
          <a>all items</a>
        </Link>
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
