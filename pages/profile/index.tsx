import { NextPage } from "next";
import { useSession } from "next-auth/react";
import ItemCard from "../../components/Item/ItemCard";
import ItemSkeletonCard from "../../components/Item/ItemSkeletonCard";
import { EmptyData } from "../../components/ItemPage/EmptyData";
import { useAppSelector } from "../../store/hooks";
import { useGetAllUserItemsQuery } from "../../store/services/ItemService";

import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";
import styles from "../../styles/profile/ProfileYourItems.module.scss";

const Profile: NextPage = () => {
  const { isMobile } = useAppSelector((state) => state.mobile);
  const { data: session } = useSession();

  const { isLoading: AreItemsLoading, data: itemsData } =
    useGetAllUserItemsQuery(
      {
        user_id: session?.user?.id,
        limit: 24,
      },
      { skip: !session }
    );

  if (AreItemsLoading || !itemsData)
    return (
      <div className={styles.your_items_content}>
        <div
          className={
            isMobile
              ? wrapperStyle.item_wrapper_grid
              : wrapperStyle.item_wrapper_wide
          }
        >
          <ItemSkeletonCard isItemWide={!isMobile} />
        </div>
      </div>
    );

  const isDataEmpty = !Boolean(itemsData.length);
  const favoritesData: any[] = [];

  if (isMobile)
    return (
      <div className={styles.your_items_content}>
        {isDataEmpty ? (
          <EmptyData mainText="You don't sell anything yet" />
        ) : (
          <div className={wrapperStyle.item_wrapper_grid}>
            {itemsData.map((item) => {
              let isFavorite: boolean;
              favoritesData.includes(item.id)
                ? (isFavorite = true)
                : (isFavorite = false);

              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isWide={false}
                  isFavoriteData={isFavorite}
                  isEditable={true}
                />
              );
            })}
          </div>
        )}
      </div>
    );

  return (
    <div className={styles.your_items_content}>
      {isDataEmpty ? (
        <EmptyData mainText="You don't sell anything yet" />
      ) : (
        <div className={wrapperStyle.item_wrapper_wide}>
          {itemsData.map((item) => {
            let isFavorite: boolean;
            favoritesData.includes(item.id)
              ? (isFavorite = true)
              : (isFavorite = false);

            return (
              <ItemCard
                key={item.id}
                item={item}
                isWide={true}
                isFavoriteData={isFavorite}
                isEditable={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
