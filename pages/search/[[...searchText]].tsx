import { NextPage } from "next";

import { useGetSearchedItemsQuery } from "../../store/services/SearchService";

import { useAppSelector } from "../../store/hooks";
import ItemCard from "../../components/Item/ItemCard";

import styles from "../../styles/search/Search.module.scss";
import wrapperStyle from "../../styles/item/ItemWrapper.module.scss";

interface IQuery {
  query: {
    searchText: string | null;
    category: string | null;
    priceFrom: string | null;
    priceTo: string | null;
  };
}

const Search: NextPage<IQuery> = ({ query }) => {
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
  if (isItemsLoading || !itemsData) return <div>loading</div>;
  console.log(itemsData);
  console.log(error);
  console.log(searchText);

  return (
    <div className={styles.search_wrapper}>
      <h2>We found {itemsData.count} items</h2>
      <div
        className={
          isMobile
            ? wrapperStyle.item_wrapper_grid
            : wrapperStyle.item_wrapper_wide
        }
      >
        {itemsData.rows.map((item) => {
          return (
            <ItemCard
              key={item.id}
              item={item}
              isWide={isMobile ? false : true}
              isFavoriteData={true}
            />
          );
        })}
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
