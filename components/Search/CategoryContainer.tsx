import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCategoryId } from "../../store/reducers/SearchSlice";

import styles from "../../styles/search/FilterBlock.module.scss";

const initialState = { id: "", name: "" };

export const CategoryContainer = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.search);
  const [selected, setSelected] = useState(initialState);

  const categories = [
    { id: "97832ad9-bc97-4c11-bca7-05fe34cd4e5f", name: "phone" },
    { id: "7fa0e4c6-669f-4a65-9a08-5793f40666c7", name: "furniture" },
    { id: "ad65d97c-1fd5-4c86-9e11-29df410355df", name: "cups" },
  ];

  const handleChangeSelection = (category: typeof initialState) => {
    setSelected(category);
  };

  useEffect(() => {
    dispatch(updateCategoryId(selected));
  }, [selected]);

  useEffect(() => {
    if (!category) setSelected(initialState);
  }, [category]);

  return (
    <div className={styles.categories_block}>
      <h3>Category</h3>
      {categories.map((category) => (
        <div className={styles.input_container} key={category.id}>
          <input
            id={category.name}
            name="category"
            value={category.id}
            type="radio"
            onChange={() => handleChangeSelection(category)}
            checked={category.id === selected.id ? true : false}
            className={styles.radio_input}
            data-active={category.id === selected.id ? true : false}
          />
          <label htmlFor={category.name} className={styles.input_label}>
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};
