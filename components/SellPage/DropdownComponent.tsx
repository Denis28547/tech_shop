import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface ICategories {
  id: string;
  name: string;
}

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  const handleBlur = () => {
    setIsOpen(false);
    setIsDirty(true);
  };

  const fetchCategories = async () => {
    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
    );
    setCategories(categories.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        <span className={`${styles.arrow} ${isOpen && styles.close_arrow}`} />
      </div>

      {!isValid && isDirty && (
        <span>*Not valid (please choose a category)</span>
      )}
    </>
  );
};

export default DropdownComponent;
