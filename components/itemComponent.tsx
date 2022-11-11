import Image from "next/image";
import phoneImage from "../public/iphone_14.jpg";
import { IItem } from "../store/redux_types";

import styles from "../styles/item/ItemComponent.module.scss";

interface IItemComponent {
  item: IItem;
}

const ItemComponent = ({ item }: IItemComponent) => {
  const item_image = `/Content/${item.images[0]}`;
  return (
    <div className={styles.item}>
      <div className={styles.image_name}>
        <Image
          src={item_image}
          alt="item_image"
          width={216}
          height={250}
          // layout="fill"
          objectFit="cover"
          className={styles.image}
        />
        <h2>{item.name}</h2>
      </div>

      <div className={styles.item_info}>
        <p>{item.location} - 22 september 2022</p>
        <b>{item.price}</b>
      </div>
    </div>
  );
};

export default ItemComponent;
