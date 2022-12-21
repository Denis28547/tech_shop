import Image from "next/image";
import Link from "next/link";

import HeartIcon from "../../public/assets/HeartIcon";
import { IItemCard } from "./IItemCard_type";

import styles from "../../styles/item/ItemCardSmall.module.scss";
import like_icon_style from "../../styles/item/LikeIconStyles.module.scss";

const ItemStyle = ({
  item_image,
  item,
  fullDate,
  isFavorite,
  changeFavorite,
}: IItemCard) => {
  return (
    <div className={styles.item}>
      <div className={styles.image_name}>
        <Link href={`/itemPage/${item.id}`}>
          <a>
            <div
              style={{ width: "100%", height: "250px", position: "relative" }}
            >
              <Image
                src={item_image}
                alt="item_image"
                objectFit="cover"
                layout="fill"
                className={styles.image}
                style={{ marginBottom: "10px", cursor: "pointer" }}
              />
            </div>
          </a>
        </Link>

        <Link href={`/itemPage/${item.id}`}>
          <a title={item.name} className={styles.name}>
            {item.name}
          </a>
        </Link>
      </div>
      <div className={styles.item_info}>
        <p>
          {item.location} - {fullDate}
        </p>
        <div className={styles.price_and_like_icon_container}>
          <b>{item.price} $</b>
          <div
            className={like_icon_style.like_icon_container}
            data-isfavorite={isFavorite}
          >
            <HeartIcon
              className={`${like_icon_style.like_icon} ${styles.like_icon}`}
              onClick={changeFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemStyle;
