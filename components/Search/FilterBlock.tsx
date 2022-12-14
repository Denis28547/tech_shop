import { PriceContainer } from "./PriceContainer";
import { CategoryContainer } from "./CategoryContainer";
import CustomButton from "../CustomButton";

import styles from "../../styles/search/FilterBlock.module.scss";
import { useEffect, useRef } from "react";

interface IFilterBlock {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FilterBlock = ({ handleSubmit }: IFilterBlock) => {
  const formEl = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   if (clearSelections) {
  //     const target = formEl.current as typeof formEl.current & {
  //       currencyFrom: { value: string };
  //       currencyTo: { value: string };
  //       category: { value: string };
  //     };
  //     console.log(target.currencyFrom.value);

  //     target.currencyFrom.value = "";
  //     target.currencyTo.value = "";
  //     console.log("cleared");
  //   }
  // }, [clearSelections]);

  return (
    <form
      className={styles.filter_block}
      onSubmit={handleSubmit}
      id="filterForm"
      ref={formEl}
    >
      <h2>Filters</h2>
      <hr />

      <CategoryContainer />

      <hr />
      <PriceContainer />
      <hr />
      {/* <h3>Currency</h3>
      <hr /> */}
      <CustomButton
        fontSize="1rem"
        buttonType="grey"
        fontWeight={600}
        width="100%"
        loading={false}
        text="Apply filters"
        height={50}
        margin="10px 0 0 0"
      />
    </form>
  );
};
