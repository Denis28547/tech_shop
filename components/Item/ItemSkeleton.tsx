import styles from "../../styles/item/SkeletonStyles.module.scss";

export const templatesFn = () => {
  let itemTemplates = [];
  for (let photoCount = 0; photoCount < 16; photoCount++) {
    itemTemplates.push(photoCount);
  }
  return itemTemplates;
};

const ItemSkeleton = () => {
  return (
    <div className={styles.item}>
      <div className={styles.image_name}>
        <div className={styles.image_skeleton}></div>

        <div className={styles.skeleton_text}></div>
        <div className={styles.skeleton_text}></div>
      </div>

      <div className={styles.item_info}>
        <div className={styles.skeleton_text2}></div>
        <div className={styles.skeleton_text2}></div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
