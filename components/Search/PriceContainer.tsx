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

  const checkIfInputNumberIsInRange = (num: string): boolean => {
    const number = Number(num);
    if (number < 0 || number > 9999999) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currencyFromRef.current || !currencyToRef.current) return;

    if (
      currencyFromRef.current.value !== "" &&
      currencyToRef.current.value !== "" &&
      Math.abs(Number(currencyFromRef.current.value)) >
        Math.abs(Number(currencyToRef.current.value))
    ) {
      setIsCurrencyFromValid(false);
      setIsCurrencyToValid(false);
      return;
    }

    const isCurrencyFromValid = checkIfInputNumberIsInRange(
      currencyFromRef.current.value
    );
    const isCurrencyToValid = checkIfInputNumberIsInRange(
      currencyToRef.current.value
    );

    if (!isCurrencyFromValid) {
      setIsCurrencyFromValid(false);
    } else {
      setIsCurrencyFromValid(true);
    }

    if (!isCurrencyToValid) {
      setIsCurrencyToValid(false);
    } else {
      setIsCurrencyToValid(true);
    }
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
          onChange={handleChange}
        />
      </div>

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
          onChange={handleChange}
        />
      </div>

      {(!isCurrencyFromValid || !isCurrencyToValid) && (
        <div className={styles.input_invalid_text} style={{ marginTop: "5px" }}>
          *Not valid (field &quot;from&quot; should be lesser than field
          &quot;to&quot;, and each should be lesser than 9999999 and should be
          positive)
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
