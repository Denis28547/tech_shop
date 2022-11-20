import Image from "next/image";
import HeartIcon from "../../public/assets/HeartIcon";
import { IItemComponent } from "./IItemComponent_type";

import styles from "../../styles/item/ItemComponent.module.scss";
import like_icon_style from "../../styles/item/LikeIconStyles.module.scss";

const ItemStyle = ({
  item_image,
  item,
  fullDate,
  isFavorite,
  changeFavorite,
  handleOpenFullItem,
}: IItemComponent) => {
  return (
    <div
      className={styles.item}
      onClick={() => {
        handleOpenFullItem();
      }}
    >
      <div className={styles.image_name}>
        <Image
          src={item_image}
          alt="item_image"
          width={216}
          height={250}
          objectFit="cover"
          className={styles.image}
          style={{ marginBottom: "10px" }}
        />

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
