import { PriceContainer } from "./PriceContainer";
import { CategoryContainer } from "./CategoryContainer";

import styles from "../../styles/search/FilterBlock.module.scss";

export const FilterBlock = () => {
  return (
    <div className={styles.filter_block} id="filterForm">
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
