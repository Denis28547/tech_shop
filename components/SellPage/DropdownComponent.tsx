import { useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const optionsArray = ["phones", "fridges", "tables"];

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  const handleBlur = () => {
    setIsOpen(false);
    setIsDirty(true);
  };

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
          {optionsArray.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={`${styles.arrow} ${isOpen && styles.close_arrow}`} />
      </div>

      {!isValid && isDirty && (
        <span>*Not valid (please choose a category)</span>
      )}
    </>
  );
};

export default DropdownComponent;
