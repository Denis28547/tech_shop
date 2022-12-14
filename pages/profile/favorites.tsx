import { NextPage } from "next";
import { useEffect, useState } from "react";

import {
  useGetAllFavoritesQuery,
  useRemoveAllFavoritesMutation,
} from "../../store/services/FavoritesService";
import { useAppSelector } from "../../store/hooks";

import ItemCard from "../../components/Item/ItemCard";
import TopBlock from "../../components/Favorites/TopBlock";
import ItemSkeletonCard from "../../components/Item/ItemSkeletonCard";
import ListLookBlock from "../../components/Favorites/ListLookBlock";
import { EmptyData } from "../../components/ItemPage/EmptyData";

import styles from "../../styles/item/Favorites.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";

const Favorites: NextPage = () => {
  const { isMobile } = useAppSelector((state) => state.mobile);
  const [isItemWide, setIsItemWide] = useState(true);

  const [removeAllFavorite, { isLoading: areItemsDeleting }] =
    useRemoveAllFavoritesMutation();

  const { isLoading: areItemsLoading, data: itemsData } =
    useGetAllFavoritesQuery();

  useEffect(() => {
    if (itemsData && itemsData.length < 4) setIsItemWide(true);
  }, [itemsData]);

  const isLoading = areItemsLoading || !itemsData;

  if (isLoading) {
    return (
      <div className={styles.favorites_wrapper}>
        <div className={styles.favorites_top_block} />
        <TopBlock
          areItemsDeleting={areItemsDeleting}
          length={0}
          isDataEmpty={true}
          removeAllFavorite={removeAllFavorite}
        />

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
  }

  const isDataEmpty = !Boolean(itemsData.length);

  if (isMobile)
    return (
      <div className={styles.favorites_wrapper}>
        <div className={styles.favorites_top_block} />
        <TopBlock
          areItemsDeleting={areItemsDeleting}
          length={itemsData.length}
          isDataEmpty={isDataEmpty}
          removeAllFavorite={removeAllFavorite}
        />
        {isDataEmpty ? (
          <EmptyData
            mainText="You favorite list is empty"
            secondaryText="you can add items to favorites when browsing site"
          />
        ) : (
          <div className={wrapperStyle.item_wrapper_grid}>
            {itemsData.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isWide={false}
                  isFavoriteData={true}
                />
              );
            })}
          </div>
        )}
      </div>
    );

  return (
    <div className={styles.favorites_wrapper}>
      <div className={styles.favorites_top_block} />
      <TopBlock
        areItemsDeleting={areItemsDeleting}
        length={itemsData.length}
        isDataEmpty={isDataEmpty}
        removeAllFavorite={removeAllFavorite}
      />
      {isDataEmpty ? (
        <EmptyData
          mainText="You favorite list is empty"
          secondaryText="you can add items to favorites when browsing site"
        />
      ) : (
        <>
          {itemsData.length >= 4 && (
            <ListLookBlock
              isItemWide={isItemWide}
              setIsItemWide={setIsItemWide}
            />
          )}
          <div
            className={
              isItemWide
                ? wrapperStyle.item_wrapper_wide
                : wrapperStyle.item_wrapper_grid
            }
          >
            {itemsData.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isWide={isItemWide}
                  isFavoriteData={true}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
