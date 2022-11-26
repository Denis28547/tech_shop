import Image from "next/image";
import HeartIcon from "../../public/assets/HeartIcon";
import { IItemCard } from "./IItemCard_type";

import styles from "../../styles/item/ItemCard.module.scss";
import like_icon_style from "../../styles/item/LikeIconStyles.module.scss";

const ItemStyle = ({
  item_image,
  item,
  fullDate,
  isFavorite,
  changeFavorite,
  handleOpenFullItem,
}: IItemCard) => {
  return (
    <div
      className={styles.item}
      onClick={() => {
        handleOpenFullItem();
      }}
    >
      <div className={styles.image_name}>
        <div style={{ width: "100%", height: "250px", position: "relative" }}>
          <Image
            src={item_image}
            alt="item_image"
            objectFit="cover"
            layout="fill"
            className={styles.image}
            style={{ marginBottom: "10px" }}
          />
        </div>

        <div title={item.name} className={styles.name}>
          {item.name}
        </div>
      </div>
      <div className={styles.item_info}>
        <p>
          {item.location} - {fullDate}
        </p>
        <p>
          <b>{item.price} $</b>
        </p>
      </div>
      <div
        className={like_icon_style.like_icon_container}
        data-isfavorite={isFavorite}
      >
        <HeartIcon
          className={like_icon_style.like_icon}
          onClick={changeFavorite}
        />
      </div>
    </div>
  );
};

export default ItemStyle;
