import { useEffect, useState } from "react";

import { useGetAllUserFavoritesIdsQuery } from "../../store/services/FavoritesService";
import { useGetSearchedItemsQuery } from "../../store/services/SearchService";

import ItemCard from "../Item/ItemCard";

import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";
import ItemSkeletonCard from "../Item/ItemSkeletonCard";
import { Dropdown } from "../Dropdown";

interface ISearchedItemsContainer {
  query: {
    [key: string]: string | null;
  };
  setItemCount: (itemCount: number) => void;
  isMobile: boolean;
}

const SearchedItemsContainer = ({
  query,
  setItemCount,
  isMobile,
}: ISearchedItemsContainer) => {
  const { search, category, from, to, sortBy } = query;
  const [selectedOption, setSelectedOption] = useState("");
  const dropDownOptions = [
    "from cheap to expensive",
    "from expensive to cheap",
    "newest",
    "name",
  ];

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
    sortBy: sortBy ? sortBy : undefined,
  });

  const isLoading =
    areItemsLoading || !itemsData || areFavoritesLoading || !favoritesData;

  useEffect(() => {
    if (itemsData) setItemCount(itemsData.count);
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
        <ItemSkeletonCard isItemWide={isMobile} />
      </div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "12px",
        }}
      >
        <Dropdown
          labelText="Sort by"
          dropDownOptions={dropDownOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          min_width={"200px"}
        />
      </div>

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
  );
};

export default SearchedItemsContainer;
