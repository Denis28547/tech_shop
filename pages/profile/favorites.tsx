import { NextPage } from "next";

import {
  useGetAllFavoritesQuery,
  useRemoveAllFavoritesMutation,
} from "../../store/services/FavoritesService";
import ItemSkeletonWide, {
  templatesFn,
} from "../../components/Item/ItemSkeletonWide";
import ItemComponent from "../../components/Item/ItemComponent";
import CustomButton from "../../components/CustomButton";
import ShopIcon from "../../public/assets/navbarIcons/ShopIcon";
import ItemWideIcon from "../../public/assets/favoritePageIcons/ItemWideIcon";

import styles from "../../styles/item/ItemWrapper.module.scss";
import { useState } from "react";

const Favorites: NextPage = () => {
  const [isItemWide, setIsItemWide] = useState(true);
  const [removeAllFavorite, { isLoading: areItemsDeleting }] =
    useRemoveAllFavoritesMutation();

  const { isLoading, data } = useGetAllFavoritesQuery();

  const itemTemplates = templatesFn();

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
        <div className={styles.favorites_top_info}>
          <h1>Favorite items</h1>
          <div className={styles.favorites_top_info_button}>
            <h3>Added ({data.length}/50)</h3>
            {!isDataEmpty && (
              <div onClick={() => removeAllFavorite()}>
                <CustomButton
                  text={"Clear favorites"}
                  loading={areItemsDeleting}
                  height={50}
                  width={"155px"}
                  margin={0}
                />
              </div>
            )}
          </div>
        </div>
        {isDataEmpty ? (
          <div className={styles.empty_data}>
            <h1>You favorite list is empty</h1>
            <p>you can add items to favorites when browsing site</p>
          </div>
        ) : (
          <>
            <div className={styles.change_look_box}>
              <b>List look:</b>
              <div onClick={() => setIsItemWide(true)}>
                <ItemWideIcon
                  className={`${styles.change_look_icons} ${
                    isItemWide && styles.change_look_icon_active
                  } `}
                />
              </div>
              <div onClick={() => setIsItemWide(false)}>
                <ShopIcon
                  className={`${styles.change_look_icons} ${
                    !isItemWide && styles.change_look_icon_active
                  }`}
                />
              </div>
            </div>
            <div
              className={`${
                isItemWide
                  ? styles.item_wrapper_wide
                  : styles.item_wrapper_small
              }`}
            >
              {data.map((item) => {
                return (
                  <ItemComponent
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
