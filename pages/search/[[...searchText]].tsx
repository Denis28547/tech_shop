import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useGetSearchedItemsQuery } from "../../store/services/SearchService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearAllFilters,
  clearOneFilter,
} from "../../store/reducers/SearchSlice";

import { FilterBlock } from "../../components/Search/FilterBlock";
import ItemCard from "../../components/Item/ItemCard";
import CustomButton from "../../components/CustomButton";

import styles from "../../styles/search/Search.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";
import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";

interface IQuery {
  query: {
    [key: string]: string | null;
  };
}

const Search: NextPage<IQuery> = ({ query }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    currencyFrom,
    currencyTo,
    category: categoryState,
  } = useAppSelector((state) => state.search);
  const { isMobile } = useAppSelector((state) => state.mobile);
  const { searchText, category, priceFrom, priceTo } = query;

  const {
    isLoading: isItemsLoading,
    data: itemsData,
    error,
  } = useGetSearchedItemsQuery({
    searchText: searchText ? searchText : undefined,
    category: category ? category : undefined,
    priceFrom: priceFrom ? priceFrom : undefined,
    priceTo: priceTo ? priceTo : undefined,
  });

  const { isLoading: isFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  if (isItemsLoading || !itemsData || isFavoritesLoading || !favoritesData)
    return <div>loading</div>;

  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newRouterUrl = "/search";
    if (searchText) newRouterUrl += `/${searchText}?`;
    else newRouterUrl += "?";
    if (currencyFrom) newRouterUrl += `&priceFrom=${currencyFrom}`;
    if (currencyTo) newRouterUrl += `&priceTo=${currencyTo}`;
    if (categoryState) newRouterUrl += `&category=${categoryState}`;
    router.push(newRouterUrl);
  };

  const clearFilters = () => {
    if (searchText) {
      dispatch(clearAllFilters());
      router.push(`/search/${searchText}`);
      return;
    }
    dispatch(clearAllFilters());
    router.push("/search");
  };

  const deleteOneFilter = (key: any) => {
    console.log("ran");
    let newRouterUrl = "/search";
    if (searchText) newRouterUrl += `/${searchText}?`;
    else newRouterUrl += "?";
    if (currencyFrom) newRouterUrl += `&priceFrom=${currencyFrom}`;
    if (currencyTo) newRouterUrl += `&priceTo=${currencyTo}`;
    if (categoryState) newRouterUrl += `&category=${categoryState}`;
    router.push(newRouterUrl);
    dispatch(clearOneFilter(key));
  };

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.top_box}>
        <h2 className={styles.count_header}>
          We found {itemsData.count} items
        </h2>
        <div className={styles.queries_container}>
          {Object.keys(query).map((key, index) => {
            return (
              query[key] && (
                <span
                  key={index}
                  className={styles.query}
                  onClick={() => deleteOneFilter(key)}
                >
                  <p>{`${key}: ${query[key]}`}</p>
                  <span> ✕</span>
                </span>
              )
            );
          })}
        </div>

        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <CustomButton
            fontSize="1rem"
            buttonType="outline"
            fontWeight={600}
            borderColor="#f43c3d"
            width="200px"
            loading={false}
            text="Clear filters"
            height={50}
            onClick={clearFilters}
          />
        </div>
      </div>

      <div className={styles.content_container}>
        <FilterBlock handleSubmit={applyFilters} />

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
  const { searchText, category, priceFrom, priceTo } = context.query;

  return {
    props: {
      query: {
        searchText: searchText ? searchText[0] : null,
        category: category || null,
        priceFrom: priceFrom || null,
        priceTo: priceTo || null,
      },
    },
  };
}

export default Search;
