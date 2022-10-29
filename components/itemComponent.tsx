import Image from "next/image";
import phoneImage from "../public/iphone_14.jpg";

import styles from "../styles/item/ItemComponent.module.scss";

const ItemComponent = () => {
  return (
    <div className={styles.item}>
      <Image
        src={phoneImage}
        alt="item_image"
        width={216}
        height={250}
        className={styles.image}
      />
      <h2>Name</h2>
      <p>$1250</p>
      <div>
        <p>Lviv</p>
        <p>22 september 2022</p>
      </div>
    </div>
  );
};

export default ItemComponent;
