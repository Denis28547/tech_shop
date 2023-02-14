import { useChangeIsFavoriteHook } from "../Item/ChangeIsFavoriteHook";

import { IItemWithUserAndCategory } from "../../types/index";
import HeartIcon from "../../public/assets/HeartIcon";

import styles from "../../styles/itemPage/DescriptionBlock.module.scss";
import like_icon_style from "../../styles/item/LikeIconStyles.module.scss";

interface IDescriptionBlock {
  item: IItemWithUserAndCategory;
  isFavoriteData: boolean;
}

const DescriptionBlock = ({ item, isFavoriteData }: IDescriptionBlock) => {
  const [isFavorite, changeFavorite] = useChangeIsFavoriteHook(
    isFavoriteData,
    item.id
  );

  const date = new Date(item.createdAt);
  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
  return (
    <div className={styles.description_block}>
      <div className={styles.date_and_like_container}>
        <small className={styles.published_text}>Published: {fullDate}</small>
        <div
          className={`${like_icon_style.like_icon_container} ${styles.like_icon_container}`}
          data-isfavorite={isFavorite}
        >
          <HeartIcon
            className={`${like_icon_style.like_icon} ${styles.like_icon}`}
            onClick={changeFavorite}
          />
        </div>
      </div>

      <h1 className={styles.item_name}>{item.name}</h1>

      <h1>
        <b>{item.price} $</b>
      </h1>

      <hr />

      <ul className={styles.tags_container}>
        <li>category: {item.category.name}</li>
      </ul>

      <hr />

      <h2>DESCRIPTION</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default DescriptionBlock;
