import Image from "next/image";
import HeartIcon from "../../public/assets/HeartIcon";
import { IItemCard } from "./IItemCard_type";

import styles from "../../styles/item/ItemCardWide.module.scss";
import like_icon_style from "../../styles/item/LikeIconStyles.module.scss";

const ItemWideStyle = ({
  item_image,
  item,
  category,
  fullDate,
  isFavorite,
  changeFavorite,
  handleOpenFullItem,
}: IItemCard) => {
  return (
    <div
      className={styles.item_wide}
      onClick={() => {
        handleOpenFullItem();
      }}
    >
      <Image
        src={item_image}
        alt="item_image"
        width={260}
        height={200}
        objectFit="cover"
        className={styles.image}
        style={{ marginBottom: "10px", borderRadius: "2px" }}
      />

      <div className={styles.item_info}>
        <div>
          <h1 title={item.name} className={styles.name}>
            {item.name}
          </h1>
          <p style={{ color: "#8e8e8e" }}>» {category}</p>
        </div>
        <h3>
          {item.location} - {fullDate}
        </h3>
      </div>

      <div className={styles.price_heart_container}>
        <b>{item.price} $</b>
        <div
          className={`${like_icon_style.like_icon_container} ${styles.like_icon_container}`}
          data-isfavorite={isFavorite}
        >
          <HeartIcon
            className={like_icon_style.like_icon}
            onClick={changeFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemWideStyle;
