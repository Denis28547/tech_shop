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
import { PaginationBlock } from "../../components/Search/PaginationBlock";

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

  const { isMobile } = useAppSelector((state) => state.smallThings);
  const { filterSidebar } = useAppSelector((state) => state.sidebars);
  const {
    search: searchState,
    from: priceFromState,
    to: priceToState,
    category: categoryState,
    sort: sortState,
    page: pageState,
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
    if (pageState) newRouterUrl += `page=${pageState}&`;
    router.replace(newRouterUrl);
  }, [
    searchState,
    priceFromState,
    priceToState,
    categoryState,
    sortState,
    pageState,
  ]);

  if (isMobile) {
    const modalHandler = () => dispatch(changeFilterSidebarState(false));
    return (
      <div className={styles.search_wrapper}>
        <TopBlockMobile category={categoryState} search={searchState} />

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

          <SearchedItemsContainer query={query} isMobile={true} />
        </div>
        <PaginationBlock is_mobile={true} />
      </div>
    );
  }

  return (
    <div className={styles.search_wrapper}>
      <TopBlock query={query} />

      <div className={styles.content_container}>
        <FilterBlock isMobile={false} categories={categories} />

        <SearchedItemsContainer query={query} isMobile={isMobile} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { search, category, from, to, sort, page } = context.query;

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
        ...(page && Number(page) > 1 && { page: page }),
      },
      categories,
    },
  };
}

export default Search;
