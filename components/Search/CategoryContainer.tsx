import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCategoryIdState } from "../../store/reducers/SearchSlice";

import { ICategory } from "../../types/index";

import styles from "../../styles/search/FilterBlock.module.scss";

interface ICategoryContainer {
  categories: ICategory[] | undefined;
}

export const CategoryContainer = ({ categories }: ICategoryContainer) => {
  const dispatch = useAppDispatch();
  const { category: categoryState } = useAppSelector((state) => state.search);

  const handleChangeCategory = (name: string) => {
    if (name === categoryState) {
      dispatch(updateCategoryIdState(""));
      return;
    }
    dispatch(updateCategoryIdState(name));
  };

  return (
    <div>
      <h3>Category</h3>
      {categories &&
        categories.map((category) => (
          <div className={styles.input_container} key={category.id}>
            <input
              id={category.name}
              name="category"
              value={category.name}
              type="radio"
              onChange={() => handleChangeCategory(category.name)}
              onClick={() => handleChangeCategory(category.name)} //both onClick and onChange are needed to uncheck value
              checked={category.name === categoryState ? true : false}
              className={styles.radio_input}
              data-active={category.name === categoryState ? true : false}
            />
            <label htmlFor={category.name} className={styles.input_label}>
              {category.name}
            </label>
          </div>
        ))}
    </div>
  );
};
