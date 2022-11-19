import Image from "next/image";
import HeartIcon from "../../public/assets/HeartIcon";
import { IItemComponent } from "./IItemComponent_type";

import styles from "../../styles/item/ItemComponentWide.module.scss";

const ItemWideStyle = ({
  item_image,
  item,
  fullDate,
  isFavorite,
  removeFromFavorites,
  handleOpenFullItem,
}: IItemComponent) => {
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
        width={216}
        height={200}
        objectFit="cover"
        className={styles.image}
        style={{ marginBottom: "10px", borderRadius: "2px" }}
      />

      <div className={styles.item_info}>
        <h1 title={item.name} className={styles.name}>
          {item.name}
        </h1>
        <h3>
          {item.location} - {fullDate}
        </h3>
      </div>

      <div className={styles.price_heart_container}>
        <b>{item.price} $</b>
        <div
          className={styles.like_icon_container}
          data-isfavorite={isFavorite}
        >
          <HeartIcon
            className={styles.like_icon}
            onClick={removeFromFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemWideStyle;
