import Image from "next/image";
import phoneImage from "../public/iphone_14.jpg";

import styles from "../styles/item/ItemComponent.module.scss";

const ItemComponent = () => {
  return (
    <div className={styles.item}>
      <div className={styles.image_name}>
        <Image
          src={phoneImage}
          alt="item_image"
          width={216}
          height={250}
          // layout="fill"
          // objectFit="cover"
          className={styles.image}
        />
        <h2>Iphone 14</h2>
      </div>

      <div className={styles.item_info}>
        <p>Lviv - 22 september 2022</p>
        <b>$1250</b>
      </div>
    </div>
  );
};

export default ItemComponent;
