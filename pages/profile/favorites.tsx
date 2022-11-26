import { NextPage } from "next";
import { useEffect, useState } from "react";

import {
  useGetAllFavoritesQuery,
  useRemoveAllFavoritesMutation,
} from "../../store/services/FavoritesService";

import ItemCard from "../../components/Item/ItemCard";
import TopBlock from "../../components/Favorites/TopBlock";
import ListLookBlock from "../../components/Favorites/ListLookBlock";

import ItemSkeleton, { templatesFn } from "../../components/Item/ItemSkeleton";
import ItemSkeletonWide from "../../components/Item/ItemSkeletonWide";

import EmptyList from "../../public/assets/favoritePageIcons/EmptyListIcon";

import styles from "../../styles/item/Favorites.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";

const Favorites: NextPage = () => {
  const [isItemWide, setIsItemWide] = useState(true);
  const [disableWideItemOption, setDisableWideItemOption] = useState(false);
  const [removeAllFavorite, { isLoading: areItemsDeleting }] =
    useRemoveAllFavoritesMutation();

  const { isLoading, data } = useGetAllFavoritesQuery();

  const itemTemplates = templatesFn();

  useEffect(() => {
    if (window && window.innerWidth <= 650) {
      setDisableWideItemOption(true);
      setIsItemWide(false);
    } else {
      setDisableWideItemOption(false);
    }
  }, []);

  if (isLoading || !data) {
    return (
      <div className={styles.favorites_wrapper}>
        <div className={styles.favorites_top_block} />
        <TopBlock
          areItemsDeleting={areItemsDeleting}
          length={0}
          isDataEmpty={true}
          removeAllFavorite={removeAllFavorite}
        />
        {isItemWide ? (
          <div className={wrapperStyle.item_wrapper_wide}>
            {itemTemplates.map((_, index) => (
              <ItemSkeletonWide key={index} />
            ))}
          </div>
        ) : (
          <div className={wrapperStyle.item_wrapper_grid}>
            {itemTemplates.map((_, index) => (
              <ItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }

  let isDataEmpty = true;
  if (data.length !== 0) isDataEmpty = false;

  return (
    <>
      <div className={styles.favorites_top_block} />
      <div className={styles.favorites_wrapper}>
        <TopBlock
          areItemsDeleting={areItemsDeleting}
          length={data.length}
          isDataEmpty={isDataEmpty}
          removeAllFavorite={removeAllFavorite}
        />
        {isDataEmpty ? (
          <div className={styles.empty_data}>
            <h1>You favorite list is empty</h1>
            <p>you can add items to favorites when browsing site</p>
            <EmptyList className={styles.emptyListIcon} />
          </div>
        ) : (
          <>
            {!disableWideItemOption && (
              <ListLookBlock
                isItemWide={isItemWide}
                setIsItemWide={setIsItemWide}
              />
            )}
            <div
              className={`${
                isItemWide
                  ? wrapperStyle.item_wrapper_wide
                  : wrapperStyle.item_wrapper_grid
              }`}
            >
              {data.map((item) => {
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
    </>
  );
};

export default Favorites;
