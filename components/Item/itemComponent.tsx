import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

import { IItem } from "../../store/redux_types";
import HeartIcon from "../../public/assets/HeartIcon";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../store/services/FavoritesService";

import styles from "../../styles/item/ItemComponent.module.scss";
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
      <div className={styles.like_icon_container} data-isfavorite={isFavorite}>
        <HeartIcon className={styles.like_icon} onClick={addToFavorites} />
      </div>
    </div>
  );
};

export default ItemComponent;
