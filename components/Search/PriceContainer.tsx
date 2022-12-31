import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updatePricesState } from "../../store/reducers/SearchSlice";
import CustomButton from "../CustomButton";

import styles from "../../styles/search/FilterBlock.module.scss";

export const PriceContainer = () => {
  const currencyFromRef = useRef<HTMLInputElement>(null);
  const [isCurrencyFromValid, setIsCurrencyFromValid] = useState(true);

  const currencyToRef = useRef<HTMLInputElement>(null);
  const [isCurrencyToValid, setIsCurrencyToValid] = useState(true);

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

  const handleCurrencyFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currencyToRef.current) return;

    if (Number(e.target.value) < 0 || Number(e.target.value) > 9999999) {
      setIsCurrencyFromValid(false);
      return;
    }

    if (
      currencyToRef.current.value &&
      Number(e.target.value) > Number(currencyToRef.current.value)
    ) {
      setIsCurrencyFromValid(false);
    } else {
      setIsCurrencyFromValid(true);
    }
  };

  const handleCurrencyToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currencyFromRef.current) return;

    if (Number(e.target.value) < 0 || Number(e.target.value) > 9999999) {
      setIsCurrencyToValid(false);
      return;
    }

    if (
      currencyFromRef.current.value &&
      Number(e.target.value) < Number(currencyFromRef.current.value)
    ) {
      setIsCurrencyToValid(false);
    } else {
      setIsCurrencyToValid(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currencyToRef.current || !currencyFromRef.current) return;

    if (Number(e.target.value) < 0 || Number(e.target.value) > 9999999) {
      if (e.target.name === "currencyFrom") setIsCurrencyFromValid(false);
      if (e.target.name === "currencyTo") setIsCurrencyToValid(false);
      return;
    }

    if (
      currencyToRef.current.value &&
      e.target.name === "currencyFrom" &&
      Number(e.target.value) > Number(currencyToRef.current.value)
    ) {
      setIsCurrencyFromValid(false);
      setIsCurrencyToValid(false);
      return;
    }

    if (
      currencyFromRef.current.value &&
      e.target.name === "currencyTo" &&
      Number(e.target.value) < Number(currencyFromRef.current.value)
    ) {
      setIsCurrencyFromValid(false);
      setIsCurrencyToValid(false);
      return;
    }

    setIsCurrencyFromValid(true);
    setIsCurrencyToValid(true);
  };

  useEffect(() => {
    if (currencyFromRef.current) {
      currencyFromRef.current.value = priceFromState;
      setIsCurrencyFromValid(true);
    }
    if (currencyToRef.current) {
      currencyToRef.current.value = priceToState;
      setIsCurrencyToValid(true);
    }
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
          id="currencyFrom"
          name="currencyFrom"
          ref={currencyFromRef}
          data-isinvalid={!isCurrencyFromValid}
          // onChange={handleCurrencyFromChange}
          onChange={handleChange}
        />
      </div>
      {!isCurrencyFromValid && (
        <div className={styles.input_invalid_text}>
          *Not valid (field should be lesser than &quot;to&quot; field, less
          than 9999999 and should be positive)
        </div>
      )}
      <div className={styles.currency_block}>
        <p>to&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <input
          type="number"
          min={0}
          max={9999999}
          id="currencyTo"
          name="currencyTo"
          ref={currencyToRef}
          data-isinvalid={!isCurrencyToValid}
          // onChange={handleCurrencyToChange}
          onChange={handleChange}
        />
      </div>
      {!isCurrencyToValid && (
        <div className={styles.input_invalid_text}>
          *Not valid (field should be bigger than &quot;from&quot; field, less
          than 9999999 and should be positive)
        </div>
      )}
      <CustomButton
        fontSize="1rem"
        buttonType="grey"
        fontWeight={600}
        width="100%"
        loading={false}
        isDisabled={!isCurrencyFromValid || !isCurrencyToValid}
        text="Apply"
        height={50}
        margin="10px 0 0 0"
      />
    </form>
  );
};
