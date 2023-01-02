import Image from "next/image";
import Link from "next/link";

import { ICategory } from "../../types/index";

import styles from "../../styles/Landing/CategoriesPreview.module.scss";

interface ICategoriesPreview {
  categoriesData: ICategory[];
}

export const CategoriesPreview = ({ categoriesData }: ICategoriesPreview) => {
  return (
    <div className={styles.categories_preview_background}>
      <h1 className={styles.category_title}>Main Categories</h1>
      <ul className={styles.categories_container}>
        {categoriesData.map((category) => (
          <li key={category.name} className={styles.category_styling}>
            <Link href={`/search?category=${category.name}&`}>
              <a
                className={styles.image_container}
                style={{ backgroundColor: category.backgroundColor }}
              >
                <Image
                  src={`/Content/categoriesPreview/${category.name}.png`}
                  alt={category.name}
                  layout="fill"
                />
              </a>
            </Link>

            <Link href={`/search?category=${category.name}&`}>
              <a className={styles.category_name} title={category.name}>
                {category.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
