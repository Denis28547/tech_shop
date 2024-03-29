import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { NextPage } from "next/types";

import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import {
  useGetAllUserItemsQuery,
  useGetItemByIdWithUserAndCategoryQuery,
} from "../../store/services/ItemService";
import PhotoBlock from "../../components/ItemPage/PhotoBlock";
import DescriptionBlock from "../../components/ItemPage/DescriptionBlock";
import UserBlock from "../../components/ItemPage/UserBlock";
import UserItemsBlock from "../../components/ItemPage/UserItemsBlock";

import styles from "../../styles/itemPage/ItemPage.module.scss";
import ItemPageSkeleton from "../../components/ItemPage/ItemPageSkeleton";

const ItemPage: NextPage = () => {
  const router = useRouter();
  const item_id = router.query.item_id;

  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  const { isLoading: isItemLoading, data: itemData } =
    useGetItemByIdWithUserAndCategoryQuery(
      typeof item_id === "string" ? item_id : skipToken,
      {
        skip: router.isFallback,
      }
    );

  const { isLoading: isItemsLoading, data: itemsData } =
    useGetAllUserItemsQuery(
      {
        user_id: itemData?.user.id,
        limit: 24,
        excludeItemId: itemData?.id,
      },
      { skip: !itemData }
    );

  if (
    isItemLoading ||
    isFavoritesLoading ||
    isItemsLoading ||
    !itemData ||
    !favoritesData
  )
    return <ItemPageSkeleton />;

  const isFavoriteData = favoritesData.includes(itemData.id);

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>
        <PhotoBlock images={itemData.images} />
        <DescriptionBlock item={itemData} isFavoriteData={isFavoriteData} />
      </div>
      <div className={styles.additional_info}>
        <UserBlock
          user={itemData.user}
          phone_number={itemData.phone_number}
          location={itemData.location}
        />
      </div>
      {itemsData && itemsData.length > 0 && (
        <div className={styles.user_items_block}>
          <UserItemsBlock itemsData={itemsData} favoritesData={favoritesData} />
        </div>
      )}
    </div>
  );
};

export default ItemPage;
