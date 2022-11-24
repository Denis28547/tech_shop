import { NextPage } from "next";

import {
  useGetAllFavoritesQuery,
  useRemoveAllFavoritesMutation,
} from "../../store/services/FavoritesService";
import ItemSkeletonWide, {
  templatesFn,
} from "../../components/Item/ItemSkeletonWide";
import ItemCard from "../../components/Item/ItemCard";
import TopBlock from "../../components/Favorites/TopBlock";
import ListLookBlock from "../../components/Favorites/ListLookBlock";
import { useEffect, useState } from "react";

import styles from "../../styles/item/ItemWrapper.module.scss";

const Favorites: NextPage = () => {
  const [isItemWide, setIsItemWide] = useState(true);
  const [disableWideItemOption, setDisableWideItemOption] = useState(false);
  const [removeAllFavorite, { isLoading: areItemsDeleting }] =
    useRemoveAllFavoritesMutation();

  const { isLoading, data } = useGetAllFavoritesQuery();

  const itemTemplates = templatesFn();

  useEffect(() => {
    function handleResize(windowListener: any) {
      const { innerWidth } = windowListener.target.window;
      if (innerWidth <= 650) {
        setDisableWideItemOption(true);
        setIsItemWide(false);
      } else {
        setDisableWideItemOption(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading || !data) {
    return (
      <div className={styles.item_wide_wrapper}>
        <div className={styles.grid}>
          {itemTemplates.map((_, index) => (
            <ItemSkeletonWide key={index} />
          ))}
        </div>
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
                  ? styles.item_wrapper_wide
                  : styles.item_wrapper_small
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
