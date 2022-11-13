import Image from "next/image";
import { useRouter } from "next/router";

import { IItem } from "../store/redux_types";

import styles from "../styles/item/ItemComponent.module.scss";

interface IItemComponent {
  item: IItem;
  isLoading: boolean;
}

const ItemComponent = ({ item, isLoading }: IItemComponent) => {
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
        {isLoading ? (
          <div className={styles.image_skeleton}></div>
        ) : (
          <Image
            src={item_image}
            alt="item_image"
            width={216}
            height={250}
            objectFit="cover"
            className={styles.image}
            style={{ marginBottom: "10px" }}
          />
        )}

        {isLoading ? (
          <>
            <div className={styles.skeleton_text}></div>
            <div className={styles.skeleton_text}></div>
          </>
        ) : (
          <div title={item.name} className={styles.name}>
            {item.name}
          </div>
        )}
      </div>

      <div className={styles.item_info}>
        {isLoading ? (
          <>
            <div className={styles.skeleton_text2}></div>
            <div className={styles.skeleton_text2}></div>
          </>
        ) : (
          <>
            <p>
              {item.location} - {fullDate}
            </p>
            <b>{item.price} $</b>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemComponent;
