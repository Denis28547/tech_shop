import EmptyList from "../../public/assets/favoritePageIcons/EmptyListIcon";
import styles from "../../styles/EmptyData.module.scss";

interface IEmptyData {
  mainText: string;
  secondaryText?: string;
}

export const EmptyData = ({ mainText, secondaryText }: IEmptyData) => {
  return (
    <div className={styles.empty_data}>
      <h1>{mainText}</h1>
      <p>{secondaryText}</p>
      <EmptyList className={styles.emptyListIcon} />
    </div>
  );
};
