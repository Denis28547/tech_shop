import { IItem } from "../store/redux_types";
import ItemComponent from "./itemComponent";

import styles from "../styles/item/ItemGridComponent.module.scss";

interface IItemsGridComponent {
  data: IItem[];
}

const ItemsGridComponent = ({ data }: IItemsGridComponent) => {
  return (
    <div className={styles.grid}>
      {data.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsGridComponent;
