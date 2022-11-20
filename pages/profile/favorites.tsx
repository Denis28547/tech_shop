import { NextPage } from "next";

import { useGetAllFavoritesQuery } from "../../store/services/FavoritesService";
import ItemSkeletonWide, {
  templatesFn,
} from "../../components/Item/ItemSkeletonWide";
import ItemComponent from "../../components/Item/ItemComponent";
import CustomButton from "../../components/CustomButton";

import styles from "../../styles/item/ItemWrapper.module.scss";
import { useState } from "react";

const Favorites: NextPage = () => {
  const [isItemWide, setIsItemWide] = useState(true);
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

  return (
    <>
      <div className={styles.favorites_top_block} />
      <div className={styles.favorites_wrapper}>
        <div className={styles.favorites_top_info}>
          <h1>Favorite items</h1>
          <div className={styles.favorites_top_info_button}>
            <h3>Added (4/50)</h3>
            <CustomButton
              text={"Clear favorites"}
              loading={false}
              height={50}
              width={"155px"}
              margin={0}
            />
          </div>
        </div>
        <button onClick={() => setIsItemWide(!isItemWide)}>CLICK</button>
        <div
          className={`${
            isItemWide ? styles.item_wrapper_wide : styles.item_wrapper_small
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
      </div>
    </>
  );
};

export default Favorites;
