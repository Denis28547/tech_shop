import styles from "../../styles/item/SkeletonStyles.module.scss";

const ItemSkeletonWide = () => {
  return (
    <div className={styles.item_wide}>
      <div className={styles.image_skeleton} />

      <div>
        <div className={styles.skeleton_text} />
        <div className={styles.skeleton_text} />
      </div>
    </div>
  );
};

export default ItemSkeletonWide;
