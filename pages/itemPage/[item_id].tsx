import { useRouter } from "next/router";
import styles from "../../styles/itemPage/itemPageWrapper.module.scss";

const ItemPage = () => {
  const router = useRouter();
  const { item_id } = router.query;

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>2</div>
      <div className={styles.additional_info}>3</div>
    </div>
  );
};

export default ItemPage;
