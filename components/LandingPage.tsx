import { useGetAllItemsQuery } from "../store/services/ItemService";
import ItemsGridComponent from "../components/ItemsGridComponent";

import styles from "../styles/LandingPage.module.scss";

const LandingPage = () => {
  const { isLoading, data } = useGetAllItemsQuery();
  console.log(isLoading);

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.landing_h1}>VIP-items</h1>
        {data && <ItemsGridComponent data={data} isLoading={false} />}
      </div>
    </>
  );
};

export default LandingPage;
