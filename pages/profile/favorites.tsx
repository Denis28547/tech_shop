import { NextPage } from "next";

import { useGetAllFavoritesQuery } from "../../store/services/FavoritesService";
import ItemSkeleton, { templatesFn } from "../../components/Item/ItemSkeleton";
import ItemComponent from "../../components/Item/itemComponent";

import styles from "../../styles/item/ItemGridComponent.module.scss";

const Favorites: NextPage = () => {
  const { isLoading, data } = useGetAllFavoritesQuery();

  const itemTemplates = templatesFn();

  if (isLoading || !data) {
    return (
      <div style={{ margin: "0 auto", marginTop: "50px" }}>
        <div className={styles.grid}>
          {itemTemplates.map((_, index) => (
            <ItemSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto", marginTop: "50px" }}>
      <div className={styles.grid}>
        {data.map((item) => {
          return (
            <ItemComponent key={item.id} item={item} isFavoriteData={true} />
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
