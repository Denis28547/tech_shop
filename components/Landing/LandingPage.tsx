import { store } from "../../store/store";
import { getRunningOperationPromises } from "../../store/services/ItemService";

import { getAllUserFavoritesIds } from "../../store/services/FavoritesService";
import { getAllCategories } from "../../store/services/CategoryService";
import { getAllItems } from "../../store/services/ItemService";

import { CategoriesPreview } from "./CategoriesPreview";
import ItemsGridCard from "../Item/ItemsGridCard";

import styles from "../../styles/landing/LandingPage.module.scss";
import { ICategory, IItem } from "../../types/index";

interface ILandingPage {
  categoriesData: ICategory[];
  itemsData: IItem[];
  favoritesData: string[];
}

const LandingPage = ({
  categoriesData,
  itemsData,
  favoritesData,
}: ILandingPage) => {
  console.log(categoriesData);
  return (
    <div className={styles.wrapper}>
      <CategoriesPreview />
      <h1 className={styles.landing_h1}>Items</h1>
      <ItemsGridCard
        isItemsLoading={false}
        itemsData={itemsData}
        isFavoritesLoading={false}
        favoritesData={favoritesData}
      />
    </div>
  );
};

export async function getServerSideProps() {
  const categories = await store.dispatch(getAllCategories.initiate());
  const items = await store.dispatch(getAllItems.initiate(24));
  const favorites = await store.dispatch(getAllUserFavoritesIds.initiate());
  await Promise.all(getRunningOperationPromises());
  console.log(categories);

  const categoriesData = categories.data;
  const itemsData = items.data;
  const favoritesData = favorites.data;

  return {
    props: {
      categoriesData,
      itemsData,
      favoritesData,
    },
  };
}

export default LandingPage;
