import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updatePricesState } from "../../store/reducers/SearchSlice";
import CustomButton from "../CustomButton";

import styles from "../../styles/search/FilterBlock.module.scss";

export const PriceContainer = () => {
  const currencyFromRef = useRef<HTMLInputElement>(null);
  const currencyToRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { from: priceFromState, to: priceToState } = useAppSelector(
    (state) => state.search
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      currencyFrom: { value: string };
      currencyTo: { value: string };
    };

    dispatch(
      updatePricesState({
        from: target.currencyFrom.value,
        to: target.currencyTo.value,
      })
    );
  };

  useEffect(() => {
    if (currencyFromRef.current) currencyFromRef.current.value = priceFromState;
    if (currencyToRef.current) currencyToRef.current.value = priceToState;
  }, [priceFromState, priceToState]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Price</h3>
      <div className={styles.currency_block}>
        <p>from</p>
        <input
          type="number"
          min={0}
          max={9999999}
          name="currencyFrom"
          ref={currencyFromRef}
        />
      </div>
      <div className={styles.currency_block}>
        <p>to</p>
        <input
          type="number"
          min={0}
          max={9999999}
          name="currencyTo"
          ref={currencyToRef}
        />
      </div>
      <CustomButton
        fontSize="1rem"
        buttonType="grey"
        fontWeight={600}
        width="100%"
        loading={false}
        text="Apply"
        height={50}
        margin="10px 0 0 0"
      />
    </form>
  );
};
