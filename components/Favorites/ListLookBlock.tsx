import ShopIcon from "../../public/assets/navbarIcons/ShopIcon";
import ItemWideIcon from "../../public/assets/favoritePageIcons/ItemWideIcon";

import styles from "../../styles/item/Favorites.module.scss";

interface IListLookBlock {
  isItemWide: boolean;
  setIsItemWide: (bool: boolean) => void;
}

const ListLookBlock = ({ isItemWide, setIsItemWide }: IListLookBlock) => {
  return (
    <div className={styles.change_look_box}>
      <b>List look:</b>
      <div
        onClick={() => setIsItemWide(true)}
        className={styles.icon_container}
      >
        <ItemWideIcon
          className={`${styles.change_look_icons} ${
            isItemWide && styles.change_look_icon_active
          } `}
        />
      </div>
      <div
        onClick={() => setIsItemWide(false)}
        className={styles.icon_container}
      >
        <ShopIcon
          className={`${styles.change_look_icons} ${
            !isItemWide && styles.change_look_icon_active
          }`}
        />
      </div>
    </div>
  );
};

export default ListLookBlock;
