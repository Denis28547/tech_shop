import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  updateCurrencyFrom,
  updateCurrencyTo,
} from "../../store/reducers/SearchSlice";

import styles from "../../styles/search/FilterBlock.module.scss";

export const PriceContainer = () => {
  const dispatch = useAppDispatch();
  const { currencyFrom, currencyTo } = useAppSelector((state) => state.search);

  return (
    <div>
      <h3>Price</h3>
      <div className={styles.currency_block}>
        <p>from</p>
        <input
          type="number"
          min={0}
          max={9999999}
          name="currencyFrom"
          value={currencyFrom}
          onChange={(e) => dispatch(updateCurrencyFrom(e.target.value))}
        />
      </div>
      <div className={styles.currency_block}>
        <p>to</p>
        <input
          type="number"
          min={0}
          max={9999999}
          name="currencyTo"
          value={currencyTo}
          onChange={(e) => dispatch(updateCurrencyTo(e.target.value))}
        />
      </div>
    </div>
  );
};
