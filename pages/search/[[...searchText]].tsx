import { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetSearchedItemsQuery } from "../../store/services/SearchService";
import { useAppSelector } from "../../store/hooks";

import { FilterBlock } from "../../components/Search/FilterBlock";
import ItemCard from "../../components/Item/ItemCard";
import CustomButton from "../../components/CustomButton";

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
  const router = useRouter();
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

  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      currencyFrom: { value: string };
      currencyTo: { value: string };
    };

    let routerUrl = "/search";

    if (searchText) {
      routerUrl += `/${searchText}?`;
    } else {
      routerUrl += `?`;
    }

    if (target.currencyFrom.value && target.currencyFrom.value !== "0") {
      routerUrl += `&priceFrom=${target.currencyFrom.value}`;
    }

    if (target.currencyTo.value && target.currencyTo.value !== "0") {
      routerUrl += `&priceTo=${target.currencyTo.value}`;
    }

    router.push(routerUrl);
  };

  const clearFilters = () => {
    if (searchText) {
      router.push(`/search/${searchText}`);
      return;
    }
    router.push("/search");
  };

  return (
    <div className={styles.search_wrapper}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          height: "64px",
          justifyContent: "space-between",
        }}
      >
        <h2 className={styles.count_header}>
          We found {itemsData.count} items
        </h2>

        <CustomButton
          fontSize="1rem"
          buttonType="outline"
          fontWeight={600}
          width="200px"
          loading={false}
          text="Clear filters"
          height={50}
          onClick={clearFilters}
        />
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
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isWide={!isMobile}
                  isFavoriteData={true}
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
  console.log(context.req.headers.referer);

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
