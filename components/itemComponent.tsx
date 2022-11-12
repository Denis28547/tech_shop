import Image from "next/image";
import { useRouter } from "next/router";

import { IItem } from "../store/redux_types";

import styles from "../styles/item/ItemComponent.module.scss";

interface IItemComponent {
  item: IItem;
}

const ItemComponent = ({ item }: IItemComponent) => {
  const item_image = `/Content/${item.images[0]}`;
  const date = new Date(item.createdAt);
  const router = useRouter();

  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const handleOpenFullItem = () => {
    router.push(`/item/${item.id}`);
  };

  // console.log(item.createdAt);
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
          // layout="fill"
          objectFit="cover"
          className={styles.image}
        />
        <div title={item.name} className={styles.name}>
          {item.name} asdfsdafsdfsdfasdsfsdaadsdfsd
        </div>
      </div>

      <div className={styles.item_info}>
        <p>{item.location}</p>
        <p>{fullDate}</p>
        <b>{item.price} $</b>
      </div>
    </div>
  );
};

export default ItemComponent;
