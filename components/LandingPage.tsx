import ItemsGridCard from "./Item/ItemsGridCard";

import styles from "../styles/LandingPage.module.scss";
import { useGetAllUserFavoritesIdsQuery } from "../store/services/FavoritesService";
import { useGetAllItemsQuery } from "../store/services/ItemService";

const LandingPage = () => {
  const { isLoading: isItemsLoading, data: itemsData } =
    useGetAllItemsQuery(24);
  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.landing_h1}>Items</h1>
        <ItemsGridCard
          isItemsLoading={isItemsLoading}
          itemsData={itemsData}
          isFavoritesLoading={isFavoritesLoading}
          favoritesData={favoritesData}
        />
      </div>
    </>
  );
};

export default LandingPage;
