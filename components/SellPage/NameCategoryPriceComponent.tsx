import { useEffect, useState } from "react";

import { ICategory } from "../../types/index";
import Dropdown from "./DropdownComponent";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface INameCategoryPriceComponent {
  nameInitial?: string;
  priceInitial?: number;
  categoryInitial?: string;
  categories: ICategory[];
}

const NameCategoryPriceComponent = ({
  nameInitial,
  priceInitial,
  categoryInitial,
  categories,
}: INameCategoryPriceComponent) => {
  const [nameState, setNameState] = useState(nameInitial || "");
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);

  const [priceState, setPriceStateState] = useState(priceInitial || "");
  const [isPriceDirty, setIsPriceDirty] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value);
    if (e.target.checkValidity()) setIsNameValid(true);
    else setIsNameValid(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceStateState(e.target.value);
    if (e.target.checkValidity()) setIsPriceValid(true);
    else setIsPriceValid(false);
  };

  useEffect(() => {
    if (!nameInitial) setNameState("");
    if (!priceInitial) setPriceStateState("");
  }, [nameInitial, priceInitial]);

  return (
    <div className={styles.option_block}>
      <h2>Choose name and category</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={nameState}
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

      <Dropdown categoryInitial={categoryInitial} categories={categories} />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        value={priceState}
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
