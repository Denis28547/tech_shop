import { useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

import Dropdown from "./DropdownComponent";

const NameCategoryPriceComponent = () => {
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);

  const [isPriceDirty, setIsPriceDirty] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) setIsNameValid(true);
    else setIsNameValid(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) setIsPriceValid(true);
    else setIsPriceValid(false);
  };

  return (
    <div className={styles.option_block}>
      <h2>Choose name and category</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Name you item"
        data-dirty={isNameDirty}
        onBlur={() => setIsNameDirty(true)}
        onChange={handleNameChange}
        pattern="^[^\s]+(\s+[^\s]+)*$"
        autoComplete="off"
        minLength={3}
        maxLength={90}
        required
      />
      {!isNameValid && isNameDirty && (
        <span>
          *Not valid (field should not be empty, no white spaces at the start
          and at the end, min length is 3, max is 90)
        </span>
      )}

      <Dropdown />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        placeholder="Price your item"
        data-dirty={isPriceDirty}
        onBlur={() => setIsPriceDirty(true)}
        onChange={handlePriceChange}
        min={1}
        max={9999999}
        required
      />
      {!isPriceValid && isPriceDirty && (
        <span>*Not valid (min price is 1, max is 9999999)</span>
      )}
    </div>
  );
};

export default NameCategoryPriceComponent;
