import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetSearchedItemsQuery } from "../../store/services/SearchService";
import { useAppSelector } from "../../store/hooks";

import ItemSkeletonCard from "../../components/Item/ItemSkeletonCard";
import TopBlock from "../../components/Search/TopBlock";
import { FilterBlock } from "../../components/Search/FilterBlock";
import ItemCard from "../../components/Item/ItemCard";

import styles from "../../styles/search/Search.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";

interface IQuery {
  query: {
    [key: string]: string | null;
  };
}

// isItemsLoading || !itemsData ||  isFavoritesLoading || !favoritesData ?

const Search: NextPage<IQuery> = ({ query }) => {
  const router = useRouter();
  const { search, category, from, to } = query;

  const {
    search: searchState,
    from: priceFromState,
    to: priceToState,
    category: categoryState,
  } = useAppSelector((state) => state.search);
  const { isMobile } = useAppSelector((state) => state.mobile);

  const {
    isLoading: areItemsLoading,
    data: itemsData,
    error,
  } = useGetSearchedItemsQuery({
    searchText: search ? search : undefined,
    category: category ? category : undefined,
    priceFrom: from ? from : undefined,
    priceTo: to ? to : undefined,
  });

  const { isLoading: areFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  useEffect(() => {
    let newRouterUrl = "/search";
    if (searchState) newRouterUrl += `/${searchState}?`;
    else newRouterUrl += "?";
    if (priceFromState) newRouterUrl += `&priceFrom=${priceFromState}`;
    if (priceToState) newRouterUrl += `&priceTo=${priceToState}`;
    if (categoryState) newRouterUrl += `&category=${categoryState}`;
    router.push(newRouterUrl);
  }, [searchState, priceFromState, priceToState, categoryState]);

  const isLoading =
    areItemsLoading || !itemsData || areFavoritesLoading || !favoritesData;

  if (isLoading) {
    return (
      <div className={styles.search_wrapper} style={{ marginTop: "20px" }}>
        <div className={styles.content_container}>
          <FilterBlock />
          <div style={{ flexGrow: "1" }}>
            <div
              className={
                isMobile
                  ? wrapperStyle.item_wrapper_grid
                  : wrapperStyle.item_wrapper_wide
              }
            >
              <ItemSkeletonCard isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.search_wrapper}>
      <TopBlock
        item_count={itemsData ? itemsData.count : 0}
        query={query}
        searchText={search}
      />

      <div className={styles.content_container}>
        <FilterBlock />

        <div style={{ flexGrow: "1" }}>
          <div
            className={
              isMobile
                ? wrapperStyle.item_wrapper_grid
                : wrapperStyle.item_wrapper_wide
            }
          >
            {itemsData.rows.map((item) => {
              let isFavorite: boolean;
              favoritesData.includes(item.id)
                ? (isFavorite = true)
                : (isFavorite = false);

              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isWide={!isMobile}
                  isFavoriteData={isFavorite}
                />
              );
            })}
          </div>
        </div>
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
