import Image from "next/image";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../store/hooks";
import { updateCategoryState } from "../../store/reducers/SearchSlice";

import { ICategory } from "../../types/index";

import styles from "../../styles/landing/CategoriesPreview.module.scss";

interface ICategoriesPreview {
  categoriesData: ICategory[];
}

export const CategoriesPreview = ({ categoriesData }: ICategoriesPreview) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const findItemsByCategory = (name: string) => {
    dispatch(updateCategoryState(name));
    router.push(`/search?category=${name}&`);
  };

  const createPathForImage = (categoryName: string): string =>
    categoryName.replaceAll(" ", "_");

  return (
    <div className={styles.categories_preview_background}>
      <h1 className={styles.category_title}>Main Categories</h1>
      <ul className={styles.categories_container}>
        {categoriesData.map((category) => (
          <li key={category.name}>
            <a
              onClick={() => findItemsByCategory(category.name)}
              className={styles.category_styling}
            >
              <div
                className={styles.image_container}
                style={{ backgroundColor: category.backgroundColor }}
              >
                <Image
                  src={`/Content/categoriesPreview/${createPathForImage(
                    category.name
                  )}.png`}
                  alt={category.name}
                  layout="fill"
                />
              </div>
              <p className={styles.category_name}>{category.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
