import { IItem } from "../../store/redux_types";
import styles from "../../styles/itemPage/DescriptionBlock.module.scss";

interface IDescriptionBlock {
  item: IItem;
}

const DescriptionBlock = ({ item }: IDescriptionBlock) => {
  return (
    <div className={styles.description_block}>
      <small>published: {item.createdAt}</small>
      <h1 style={{ fontWeight: "400", marginTop: "5px" }}>{item.name}</h1>
      <h1 style={{ padding: "15px 0" }}>
        <b>{item.price}</b>
      </h1>
      <h2 style={{ paddingBottom: "15px" }}>Description</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default DescriptionBlock;
