import ItemsGridComponent from "./Item/ItemsGridComponent";

import styles from "../styles/LandingPage.module.scss";

const LandingPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.landing_h1}>Items</h1>
        <ItemsGridComponent />
      </div>
    </>
  );
};

export default LandingPage;
