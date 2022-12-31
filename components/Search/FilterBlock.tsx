import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearAllFilters } from "../../store/reducers/SearchSlice";

import { QueryContainer } from "./QueryContainer";
import { PriceContainer } from "./PriceContainer";
import { CategoryContainer } from "./CategoryContainer";
import CustomButton from "../CustomButton";

import { ICategory } from "../../types/index";

import styles from "../../styles/search/FilterBlock.module.scss";

interface IFilterBlock {
  isMobile: boolean;
  query?: {
    [key: string]: string;
  };
  categories: ICategory[] | undefined;
}

export const FilterBlock = ({ isMobile, query, categories }: IFilterBlock) => {
  const dispatch = useAppDispatch();
  const { filterSidebar } = useAppSelector((state) => state.sidebars);

  if (isMobile) {
    return (
      <div
        className={`${styles.filter_block} ${styles.filters_block_mobile} ${
          filterSidebar ? styles.open_filter_sidebar : ""
        }`}
        id="filterForm"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Filters</h2>
          <CustomButton
            fontSize="1rem"
            buttonType="outline"
            fontWeight={600}
            borderColor="#f43c3d"
            width="120px"
            loading={false}
            text="Clear filters"
            height={32}
            onClick={() => dispatch(clearAllFilters())}
          />
        </div>
        {query &&
          Object.keys(query).length !==
            0 /*so it won't show unneeded div in filters if object is empty*/ && (
            <QueryContainer query={query} isMobile={true} />
          )}
        <hr />

        <CategoryContainer categories={categories} />

        <hr />
        <PriceContainer />
      </div>
    );
  }

  return (
    <div
      className={`${styles.filter_block} ${styles.filters_computer} `}
      id="filterForm"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Filters</h2>
      </div>

      <hr />

      <CategoryContainer categories={categories} />

      <hr />
      <PriceContainer />
      {/* <h3>Currency</h3>
      <hr /> */}
      {/* <CustomButton
        fontSize="1rem"
        buttonType="grey"
        fontWeight={600}
        width="100%"
        loading={false}
        text="Apply filters"
        height={50}
        margin="10px 0 0 0"
      /> */}
    </div>
  );
};
