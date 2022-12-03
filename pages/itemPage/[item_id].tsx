import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { useGetItemByIdWithUserQuery } from "../../store/services/ItemService";
import PhotoBlock from "../../components/ItemPage/PhotoBlock";
import DescriptionBlock from "../../components/ItemPage/DescriptionBlock";
import UserBlock from "../../components/ItemPage/UserBlock";

import styles from "../../styles/itemPage/itemPage.module.scss";
import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import UserItemsBlock from "../../components/ItemPage/UserItemsBlock";

const ItemPage = () => {
  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  const router = useRouter();
  const item_id = router.query.item_id;

  const {
    isLoading: isItemLoading,
    data: itemData,
    error,
  } = useGetItemByIdWithUserQuery(
    typeof item_id === "string" ? item_id : skipToken,
    {
      skip: router.isFallback,
    }
  );

  if (error) return <h1>error</h1>;
  if (isItemLoading || isFavoritesLoading || !itemData || !favoritesData)
    return <h1>loading</h1>;

  const isFavoriteData = favoritesData.includes(itemData.id);

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>
        <PhotoBlock images={itemData.images} />
        <DescriptionBlock item={itemData} isFavoriteData={isFavoriteData} />
      </div>
      <div className={styles.additional_info}>
        <UserBlock user={itemData.user} />
      </div>
      <div className={styles.user_items_block}>
        <h2>All items from this user</h2>
        <UserItemsBlock />
      </div>
    </div>
  );
};

export default ItemPage;
