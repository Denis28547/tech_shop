import { PriceContainer } from "./PriceContainer";
import { CategoryContainer } from "./CategoryContainer";

import styles from "../../styles/search/FilterBlock.module.scss";
import { useAppSelector } from "../../store/hooks";

interface IFilterBlock {
  isMobile: boolean;
}

export const FilterBlock = ({ isMobile }: IFilterBlock) => {
  const { filterSidebar } = useAppSelector((state) => state.sidebars);
  // console.log(filterSidebar);
  console.log(isMobile);

  return (
    <div
      className={`${styles.filter_block} ${
        isMobile ? styles.filters_mobile : styles.filters_computer
      } ${filterSidebar && styles.open_filter_sidebar}`}
      id="filterForm"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Filters</h2>
      <hr />

      <CategoryContainer />

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
