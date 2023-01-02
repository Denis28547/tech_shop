import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { store } from "../../store/store";
import { getRunningOperationPromises } from "../../store/services/ItemService";
import { getAllCategories } from "../../store/services/CategoryService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateAllStates } from "../../store/reducers/SearchSlice";
import { changeFilterSidebarState } from "../../store/reducers/SidebarSlice";

import { ICategory } from "../../types/index";

import Modal from "../../components/Modal";
import TopBlock from "../../components/Search/TopBlock";
import { TopBlockMobile } from "../../components/Search/TopBlockMobile";
import { FilterBlock } from "../../components/Search/FilterBlock";
import SearchedItemsContainer from "../../components/Search/SearchedItemsContainer";

import styles from "../../styles/search/Search.module.scss";

interface IQuery {
  query: {
    [key: string]: string;
  };
  categories: ICategory[] | undefined;
}

const Search: NextPage<IQuery> = ({ query, categories }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [itemCount, setItemCount] = useState<number | null>(null);

  const { isMobile } = useAppSelector((state) => state.mobile);
  const { filterSidebar } = useAppSelector((state) => state.sidebars);
  const {
    search: searchState,
    from: priceFromState,
    to: priceToState,
    category: categoryState,
    sort: sortState,
    isStateInitial,
  } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(updateAllStates(query));
  }, [query]);

  useEffect(() => {
    if (isStateInitial) return;
    let newRouterUrl = "/search";
    if (searchState) newRouterUrl += `/${searchState}?&`;
    else newRouterUrl += "?";
    if (priceFromState) newRouterUrl += `from=${priceFromState}&`;
    if (priceToState) newRouterUrl += `to=${priceToState}&`;
    if (categoryState) newRouterUrl += `category=${categoryState}&`;
    if (sortState) newRouterUrl += `sort=${sortState}&`;
    router.replace(newRouterUrl);
  }, [searchState, priceFromState, priceToState, categoryState, sortState]);

  if (isMobile) {
    const modalHandler = () => dispatch(changeFilterSidebarState(false));
    return (
      <div className={styles.search_wrapper}>
        <TopBlockMobile
          item_count={itemCount}
          category={categoryState}
          search={searchState}
        />

        <div>
          <Modal
            active={filterSidebar}
            setActive={modalHandler}
            putChildrenInContainer={false}
          >
            <FilterBlock
              isMobile={true}
              query={query}
              categories={categories}
            />
          </Modal>

          <SearchedItemsContainer
            query={query}
            setItemCount={setItemCount}
            isMobile={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.search_wrapper}>
      <TopBlock item_count={itemCount} query={query} />

      <div className={styles.content_container}>
        <FilterBlock isMobile={false} categories={categories} />

        <SearchedItemsContainer
          query={query}
          setItemCount={setItemCount}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { search, category, from, to, sort } = context.query;

  const data = await store.dispatch(getAllCategories.initiate());
  await Promise.all(getRunningOperationPromises());
  const categories = data.data;

  return {
    props: {
      query: {
        ...(search && { search: search[0] }),
        ...(category && { category: category }),
        ...(from && { from: from }),
        ...(to && { to: to }),
        ...(sort && { sort: sort }),
      },
      categories,
    },
  };
}

export default Search;
