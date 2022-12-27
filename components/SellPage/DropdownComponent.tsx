import { useState } from "react";

import { useGetAllCategoriesQuery } from "../../store/services/CategoryService";
import { ArrowIcon } from "../../public/assets/ArrowIcon";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface ICategories {
  id: string;
  name: string;
}

const DropdownComponent = () => {
  const { isLoading, data: categories } = useGetAllCategoriesQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  const handleBlur = () => {
    setIsOpen(false);
    setIsDirty(true);
  };

  if (isLoading || !categories)
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
            defaultValue=""
            required
          >
            <option value="" disabled hidden>
              Choose category
            </option>
          </select>
          <span className={`${styles.arrow} ${isOpen && styles.close_arrow}`} />
        </div>

        {!isValid && isDirty && (
          <span>*Not valid (please choose a category)</span>
        )}
      </>
    );

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
          defaultValue=""
          required
        >
          <option value="" disabled hidden>
            Choose category
          </option>
          {categories.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
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
