import { useEffect, useState } from "react";

import { ICategory } from "../../types/index";
import { ArrowIcon } from "../../public/assets/ArrowIcon";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface IDropdownComponent {
  categoryInitial?: string;
  categories: ICategory[];
}

const DropdownComponent = ({
  categoryInitial,
  categories,
}: IDropdownComponent) => {
  const [chosenCategory, setChosenCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenCategory(e.target.value);
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOpen(false);
    setIsDirty(true);
    if (!e.target.value) setIsValid(false);
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    if (categories) {
      const categoryNameInitial = categories?.find(
        (category) => category.id === categoryInitial
      )?.name;
      setChosenCategory(categoryNameInitial || "");
    }
  }, [categories]);

  return (
    <>
      <label htmlFor="category">Category</label>
      <div className={styles.select_container}>
        <select
          id="category"
          name="category"
          data-dirty={isDirty}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={handleBlur}
          onChange={handleNameChange}
          value={chosenCategory}
          required
        >
          <option value="" disabled hidden>
            Choose category
          </option>
          {categories.map((option) => (
            <option key={option.id} value={option.name}>
              {capitalizeFirstLetter(option.name)}
            </option>
          ))}
        </select>
        <ArrowIcon
          className={`${styles.arrow} ${isOpen && styles.close_arrow}`}
        />
      </div>

      {!isValid && isDirty && (
        <span>*Not valid (please choose a category)</span>
      )}
    </>
  );
};

export default DropdownComponent;
