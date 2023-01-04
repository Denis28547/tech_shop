import { useEffect, useState } from "react";

import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetSearchedItemsQuery } from "../../store/services/SearchService";
import { setItemCount } from "../../store/reducers/SearchSlice";
import { useAppDispatch } from "../../store/hooks";

import ItemCard from "../Item/ItemCard";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";
import ItemSkeletonCard from "../Item/ItemSkeletonCard";
import TopBar from "./TopBarInItemsList";
import { EmptyData } from "../ItemPage/EmptyData";
import { PageBlock } from "./PageBlock";

interface ISearchedItemsContainer {
  query: {
    [key: string]: string | null;
  };
  isMobile: boolean;
}

let sortByMap = new Map([
  ["name", "name"],
  ["newest", "newest"],
  ["cheap to expensive", "cheap"],
  ["expensive to cheap", "expensive"],
]);

const SearchedItemsContainer = ({
  query,
  isMobile,
}: ISearchedItemsContainer) => {
  const dispatch = useAppDispatch();

  const { search, category, from, to, sort, page } = query;

  const [isWide, setIsWide] = useState(!isMobile);

  const { isLoading: areFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

  const limit = "2";

  let offset = undefined;
  const pageNumber = Number(page);
  if (page && pageNumber > 1) offset = (pageNumber - 1) * Number(limit);

  const { isLoading: areItemsLoading, data: itemsData } =
    useGetSearchedItemsQuery({
      searchText: search ? search : undefined,
      category: category ? category : undefined,
      priceFrom: from ? from : undefined,
      priceTo: to ? to : undefined,
      sortBy: sort ? sortByMap.get(sort) : undefined,
      limit: limit ? limit : undefined,
      offset: offset,
    });

  const isLoading =
    areItemsLoading || !itemsData || areFavoritesLoading || !favoritesData;

  useEffect(() => {
    if (itemsData) dispatch(setItemCount(itemsData.count.toString()));
    if (itemsData && itemsData.count < 4) setIsWide(true);
  }, [itemsData]);

  if (isLoading)
    return (
      <div
        className={
          isMobile
            ? wrapperStyle.item_wrapper_grid
            : wrapperStyle.item_wrapper_wide
        }
      >
        <ItemSkeletonCard isItemWide={!isMobile} />
      </div>
    );

  const isDataEmpty = !Boolean(itemsData.count);

  if (isMobile)
    return (
      <>
        {isDataEmpty ? (
          <EmptyData mainText="We didn't find any items with chosen filters" />
        ) : (
          <div className={wrapperStyle.item_wrapper_grid}>
            {itemsData.rows.map((item) => {
              let isFavorite: boolean;
              favoritesData.includes(item.id)
                ? (isFavorite = true)
                : (isFavorite = false);

              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isWide={false}
                  isFavoriteData={isFavorite}
                />
              );
            })}
          </div>
        )}
      </>
    );

  return (
    <div>
      <TopBar
        isWide={isWide}
        setIsWide={setIsWide}
        enableListLookChange={itemsData.count >= 4}
      />

      {isDataEmpty ? (
        <EmptyData mainText="We didn't find any items with chosen filters" />
      ) : (
        <div
          className={
            isWide
              ? wrapperStyle.item_wrapper_wide
              : wrapperStyle.item_wrapper_grid
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
                isWide={isWide}
                isFavoriteData={isFavorite}
              />
            );
          })}
        </div>
      )}

      <PageBlock />
    </div>
  );
};

export default SearchedItemsContainer;
