import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateAllStates } from "../../store/reducers/SearchSlice";

import TopBlock from "../../components/Search/TopBlock";
import { FilterBlock } from "../../components/Search/FilterBlock";
import SearchedItemsContainer from "../../components/Search/SearchedItemsContainer";

import styles from "../../styles/search/Search.module.scss";
import { TopBlockMobile } from "../../components/Search/TopBlockMobile";
import Modal from "../../components/Modal";
import { changeFilterSidebarState } from "../../store/reducers/SidebarSlice";

interface IQuery {
  query: {
    [key: string]: string | null;
  };
}

const Search: NextPage<IQuery> = ({ query }) => {
  const { isMobile } = useAppSelector((state) => state.mobile);
  const { filterSidebar } = useAppSelector((state) => state.sidebars);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [itemCount, setItemCount] = useState(0);

  const {
    search: searchState,
    from: priceFromState,
    to: priceToState,
    category: categoryState,
    isStateInitial,
  } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(updateAllStates(query));
  }, [query]);

  useEffect(() => {
    if (isStateInitial) return;
    let newRouterUrl = "/search";
    if (searchState) newRouterUrl += `/${searchState}?`;
    else newRouterUrl += "?";
    if (priceFromState) newRouterUrl += `&priceFrom=${priceFromState}`;
    if (priceToState) newRouterUrl += `&priceTo=${priceToState}`;
    if (categoryState) newRouterUrl += `&category=${categoryState}`;
    router.push(newRouterUrl);
  }, [searchState, priceFromState, priceToState, categoryState]);

  const modalHandler = () => dispatch(changeFilterSidebarState(false));

  return (
    <div className={styles.search_wrapper}>
      {!isMobile && (
        <TopBlock
          item_count={itemCount}
          query={query}
          searchText={searchState}
        />
      )}

      {isMobile && <TopBlockMobile />}

      <div className={styles.content_container}>
        {isMobile ? (
          <Modal
            active={filterSidebar}
            setActive={modalHandler}
            putChildrenInContainer={false}
          >
            <FilterBlock isMobile={isMobile} />
          </Modal>
        ) : (
          <FilterBlock isMobile={false} />
        )}
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
  const { search, category, priceFrom, priceTo } = context.query;

  return {
    props: {
      query: {
        search: search ? search[0] : null,
        category: category || null,
        from: priceFrom || null,
        to: priceTo || null,
      },
    },
  };
}

export default Search;
