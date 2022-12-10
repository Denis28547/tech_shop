import { NextPage } from "next";

import { useGetSearchedItemsQuery } from "../../store/services/SearchService";

interface IQuery {
  query: {
    searchText: string;
    category: string | null;
    priceFrom: string | null;
    priceTo: string | null;
  };
}

const Search: NextPage<IQuery> = ({ query }) => {
  const { searchText, category, priceFrom, priceTo } = query;

  const { isLoading: isItemsLoading, data: itemsData } =
    useGetSearchedItemsQuery({
      searchText,
      category: category ? category : undefined,
      priceFrom: priceFrom ? priceFrom : undefined,
      priceTo: priceTo ? priceTo : undefined,
    });

  return <div>Search</div>;
};

export async function getServerSideProps(context: any) {
  const { searchText, category, priceFrom, priceTo } = context.query;

  return {
    props: {
      query: {
        searchText,
        category: category || null,
        priceFrom: priceFrom || null,
        priceTo: priceTo || null,
      },
    },
  };
}

export default Search;
