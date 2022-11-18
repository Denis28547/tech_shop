import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

import { IItem } from "../../store/redux_types";
import HeartIcon from "../../public/assets/HeartIcon";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";

// import styles from "../../styles/item/ItemComponent.module.scss";
import styles from "../../styles/item/ItemComponentWide.module.scss";

interface IItemComponent {
  item: IItem;
  isFavoriteData?: boolean;
}

const ItemComponent = ({ item, isFavoriteData }: IItemComponent) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteData);
  const item_image = `/Content/${item.images[0]}`;
  const date = new Date(item.createdAt);
  const router = useRouter();

  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const handleOpenFullItem = () => {
    router.push(`/itemPage/${item.id}`);
  };

  const [addFavorite, addThings] = useAddFavoriteMutation();
  const [removeFavorite, removeThings] = useRemoveFavoriteMutation();

  const addToFavorites = (e: MouseEvent) => {
    e.stopPropagation();

    if (!isFavorite) {
      addFavorite(item.id);
      setIsFavorite(true);
    } else {
      removeFavorite(item.id);
      setIsFavorite(false);
    }
  };

  return (
    <div
      className={`${styles.item} ${styles.item_wide}`}
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
        <h2 title={item.name} className={styles.name}>
          {item.name}
        </h2>
        <p>
          {item.location} - {fullDate}
        </p>
      </div>

      <div className={styles.price_heart_container}>
        <b>{item.price} $</b>
        {/* <b>9999999 $</b> */}
        <div
          className={styles.like_icon_container}
          data-isfavorite={isFavorite}
        >
          <HeartIcon className={styles.like_icon} onClick={addToFavorites} />
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
