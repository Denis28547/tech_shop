import ItemsGridCard from "../Item/ItemsGridCard";
import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetAllUserItemsQuery } from "../../store/services/ItemService";

import styles from "../../styles/itemPage/UserItemsBlock.module.scss";
import Link from "next/link";

interface IUserItemsBlock {
  user_id: string;
}

const UserItemsBlock = ({ user_id }: IUserItemsBlock) => {
  // const { isLoading: isItemsLoading, data: itemsData } =
  //   useGetAllUserItemsQuery(user_id, 1);
  const {
    isLoading: isItemsLoading,
    data: itemsData,
    error,
  } = useGetAllUserItemsQuery(user_id);
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
