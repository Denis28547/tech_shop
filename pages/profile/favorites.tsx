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
import EmptyList from "../../public/assets/favoritePageIcons/EmptyListIcon";

import styles from "../../styles/item/Favorites.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";

const Favorites: NextPage = () => {
  const { isMobile } = useAppSelector((state) => state.mobile);
  const [isItemWide, setIsItemWide] = useState(true);
  const [disableWideItemOption, setDisableWideItemOption] = useState(false);

  const [removeAllFavorite, { isLoading: areItemsDeleting }] =
    useRemoveAllFavoritesMutation();

  const { isLoading: areItemsLoading, data } = useGetAllFavoritesQuery();

  useEffect(() => {
    if (isMobile) {
      setDisableWideItemOption(true);
      setIsItemWide(false);
      return;
    }
    if (!data) return;
    if (data.length < 4 && !isMobile) {
      setDisableWideItemOption(true);
      setIsItemWide(true);
    } else {
      setDisableWideItemOption(false);
    }
  }, [data]);

  const isLoading = areItemsLoading || !data;

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
            isItemWide
              ? wrapperStyle.item_wrapper_grid
              : wrapperStyle.item_wrapper_wide
          }
        >
          <ItemSkeletonCard isItemWide={isItemWide} />
        </div>
      </div>
    );
  }

  const isDataEmpty = !Boolean(data.length);

  return (
    <div className={styles.favorites_wrapper}>
      <div className={styles.favorites_top_block} />
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
            className={
              isItemWide
                ? wrapperStyle.item_wrapper_wide
                : wrapperStyle.item_wrapper_grid
            }
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
  );
};

export default Favorites;
