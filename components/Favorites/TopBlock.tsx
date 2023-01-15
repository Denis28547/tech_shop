import CustomButton from "../CustomButton";

import styles from "../../styles/profile/Favorites.module.scss";

interface ITopBlock {
  length: number;
  isDataEmpty: boolean;
  areItemsDeleting: boolean;
  removeAllFavorite: () => void;
}

export const TopBlock = ({
  length,
  isDataEmpty,
  areItemsDeleting,
  removeAllFavorite,
}: ITopBlock) => {
  return (
    <div className={styles.favorites_top_info}>
      <div className={styles.favorites_top_info_button}>
        <h3>Added ({length}/50)</h3>
        {!isDataEmpty && (
          <div onClick={() => removeAllFavorite()}>
            <CustomButton
              text={"Clear favorites"}
              loading={areItemsDeleting}
              height={50}
              width={"155px"}
              fontSize="1rem"
              fontWeight={600}
              buttonType="grey"
            />
          </div>
        )}
      </div>
    </div>
  );
};
