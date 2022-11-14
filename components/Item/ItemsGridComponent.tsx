import { IItem } from "../../store/redux_types";
import ItemComponent from "./itemComponent";
import ItemSkeleton from "./ItemSkeleton";

import styles from "../../styles/item/ItemGridComponent.module.scss";
import { useGetAllItemsQuery } from "../../store/services/ItemService";

const ItemsGridComponent = () => {
  const { isLoading, data } = useGetAllItemsQuery(24);

  let itemTemplates = [];
  for (let photoCount = 0; photoCount < 8; photoCount++) {
    itemTemplates.push(photoCount);
  }
  return (
    <div className={styles.grid}>
      {isLoading &&
        !data &&
        itemTemplates.map((_, index) => <ItemSkeleton key={index} />)}
      {data && data.map((item) => <ItemComponent key={item.id} item={item} />)}
    </div>
  );
};

export default ItemsGridComponent;
