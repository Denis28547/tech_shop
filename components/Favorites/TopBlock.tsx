import CustomButton from "../CustomButton";

import styles from "../../styles/item/Favorites.module.scss";

interface ITopBlock {
  length: number;
  isDataEmpty: boolean;
  areItemsDeleting: boolean;
  removeAllFavorite: () => void;
}

const TopBlock = ({
  length,
  isDataEmpty,
  areItemsDeleting,
  removeAllFavorite,
}: ITopBlock) => {
  return (
    <div className={styles.favorites_top_info}>
      <h1>Favorite items</h1>
      <div className={styles.favorites_top_info_button}>
        <h3>Added ({length}/50)</h3>
        {!isDataEmpty && (
          <div onClick={() => removeAllFavorite()}>
            <CustomButton
              text={"Clear favorites"}
              loading={areItemsDeleting}
              height={50}
              width={"155px"}
              margin={0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBlock;
