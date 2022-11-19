import { NextPage } from "next";

import { useGetAllFavoritesQuery } from "../../store/services/FavoritesService";
import ItemSkeletonWide, {
  templatesFn,
} from "../../components/Item/ItemSkeletonWide";
import ItemComponent from "../../components/Item/ItemComponent";

import styles from "../../styles/item/ItemComponentWide.module.scss";

const Favorites: NextPage = () => {
  const { isLoading, data } = useGetAllFavoritesQuery();

  const itemTemplates = templatesFn();

  if (isLoading || !data) {
    return (
      <div className={styles.item_wide_wrapper}>
        <div className={styles.grid}>
          {itemTemplates.map((_, index) => (
            <ItemSkeletonWide key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.item_wide_wrapper}>
      {data.map((item) => {
        return <ItemComponent key={item.id} item={item} isWide={true} />;
      })}
    </div>
  );
};

export default Favorites;
