import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDeleteItemMutation } from "../../store/services/ItemService";

import HeartIcon from "../../public/assets/HeartIcon";
import { IItemCardWithCategory } from "./IItemCard_type";
import CustomButton from "../CustomButton";

import like_icon_style from "../../styles/item/LikeIconStyles.module.scss";
import styles from "../../styles/item/ItemCardWide.module.scss";

const ItemWideStyle = ({
  item_image,
  item,
  fullDate,
  isFavorite,
  changeFavorite,
  isEditable,
}: IItemCardWithCategory) => {
  const [deleteItem] = useDeleteItemMutation();
  const router = useRouter();

  if (isEditable) {
    return (
      <div className={styles.item_wide}>
        <Link href={`/itemPage/${item.id}`}>
          <a style={{ position: "relative" }}>
            <Image
              src={item_image}
              alt="item_image"
              width={260}
              height={200}
              objectFit="cover"
              className={styles.image}
            />
          </a>
        </Link>

        <div className={styles.item_info}>
          <div>
            <Link href={`/itemPage/${item.id}`}>
              <a title={item.name} className={styles.name}>
                {item.name}
              </a>
            </Link>
            {item.category && (
              <p style={{ color: "#8e8e8e" }}>» {item.category.name}</p>
            )}
          </div>
          <h3>
            {item.location} - {fullDate}
          </h3>
        </div>

        <div className={styles.price_heart_container}>
          <b>{item.price} $</b>
        </div>

        <div className={styles.edit_block}>
          <button
            className={styles.delete_button}
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
          <CustomButton
            fontSize="1rem"
            buttonType="outline"
            borderColor="#ffffff"
            fontWeight={600}
            width="125px"
            loading={false}
            text="Edit"
            height={40}
            onClick={() => router.push(`/sellItem/${item.id}`)}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.item_wide}>
      <Link href={`/itemPage/${item.id}`}>
        <a style={{ position: "relative" }}>
          <Image
            src={item_image}
            alt="item_image"
            width={260}
            height={200}
            objectFit="cover"
            className={styles.image}
          />
        </a>
      </Link>

      <div className={styles.item_info}>
        <div>
          <Link href={`/itemPage/${item.id}`}>
            <a title={item.name} className={styles.name}>
              {item.name}
            </a>
          </Link>
          {item.category && (
            <p style={{ color: "#8e8e8e" }}>» {item.category.name}</p>
          )}
        </div>
        <h3>
          {item.location} - {fullDate}
        </h3>
      </div>

      <div className={styles.price_heart_container}>
        <b>{item.price} $</b>
        <div
          className={`${like_icon_style.like_icon_container} ${styles.like_icon_container}`}
          data-isfavorite={isFavorite}
        >
          <HeartIcon
            className={like_icon_style.like_icon}
            onClick={changeFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemWideStyle;
