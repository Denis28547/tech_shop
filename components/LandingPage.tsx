import ItemsGridCard from "./Item/ItemsGridCard";

import styles from "../styles/LandingPage.module.scss";

const LandingPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.landing_h1}>Items</h1>
        <ItemsGridCard />
      </div>
    </>
  );
};

export default LandingPage;
