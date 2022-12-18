import styles from "../../styles/itemPage/ItemPage.module.scss";
import skeletonStyles from "../../styles/itemPage/SkeletonItemPage.module.scss";

const ItemPageSkeleton = () => {
  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>
        <div className={skeletonStyles.image_block_skeleton}>
          <div className={skeletonStyles.image} />
        </div>
        <div className={skeletonStyles.description_block_skeleton}>
          <h1 className={skeletonStyles.item_name} />
          <h1 className={skeletonStyles.item_name} />
          <h1 className={skeletonStyles.item_description} />
          <div className={skeletonStyles.item_description_text_container}>
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
            <p className={skeletonStyles.item_description_text} />
          </div>
        </div>
      </div>
      <div className={styles.additional_info}>
        <div className={skeletonStyles.user_block_skeleton}>
          <div className={skeletonStyles.user_info}>
            <div className={skeletonStyles.user_image} />
            <div className={skeletonStyles.user_text}>
              <h3 />
              <p />
              <p />
            </div>
          </div>
          <div className={skeletonStyles.rating_block} />
          <div className={skeletonStyles.button_container}>
            <div className={skeletonStyles.button} />
            <div className={skeletonStyles.button} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPageSkeleton;
