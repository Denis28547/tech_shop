import { NextPage } from "next";
import { store } from "../store/store";
import {
  getRunningOperationPromises,
  useGetAllItemsQuery,
} from "../store/services/ItemService";

import {
  getAllUserFavoritesIds,
  useGetAllUserFavoritesIdsQuery,
} from "../store/services/FavoritesService";
import { getAllCategories } from "../store/services/CategoryService";

import { ICategory } from "../types/index";
import { CategoriesPreview } from "../components/Landing/CategoriesPreview";
import ItemsGridCard from "../components/Item/ItemsGridCard";

import styles from "../styles/landing/LandingPage.module.scss";

interface ILandingPage {
  categoriesData: ICategory[];
}

const LandingPage: NextPage<ILandingPage> = ({ categoriesData }) => {
  const { isLoading: isItemsLoading, data: itemsData } =
    useGetAllItemsQuery(16);
  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  return (
    <>
      <CategoriesPreview categoriesData={categoriesData} />
      <div className={styles.landing_pageWrapper}>
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

export async function getServerSideProps() {
  const categories = await store.dispatch(getAllCategories.initiate());
  await Promise.all(getRunningOperationPromises());

  const categoriesData = categories.data;

  return {
    props: {
      categoriesData: categoriesData || [],
    },
  };
}

export default LandingPage;
