import { useAppSelector } from "../../store/hooks";
import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetSearchedItemsQuery } from "../../store/services/SearchService";

import ItemCard from "../Item/ItemCard";

import styles from "../../styles/search/Search.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";
import ItemSkeletonCard from "../Item/ItemSkeletonCard";

interface ISearchedItemsContainer {
  [key: string]: string | null;
}

const SearchedItemsContainer = ({
  search,
  category,
  from,
  to,
}: ISearchedItemsContainer) => {
  const { isMobile } = useAppSelector((state) => state.mobile);

  const { isLoading: areFavoritesLoading, data: favoritesData } =
    useGetAllUserFavoritesIdsQuery();

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

  const isLoading =
    areItemsLoading || !itemsData || areFavoritesLoading || !favoritesData;

  if (isLoading)
    return (
      <div
        className={
          isMobile
            ? wrapperStyle.item_wrapper_grid
            : wrapperStyle.item_wrapper_wide
        }
      >
        <ItemSkeletonCard isMobile={isMobile} />
      </div>
    );
  console.log(itemsData);

  return (
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
  );
};

export default SearchedItemsContainer;
