import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import halloweenImage from "../public/static/halloween_sale.jpg";

import ItemsGridComponent from "../components/ItemsGridComponent";

import styles from "../styles/LandingPage.module.scss";

const Home: NextPage = () => {
  const router = useRouter();

  // if (session.status === "loading") return <div>LOADING...</div>;
  return (
    <>
      <div className={styles.main_wrapper}>
        {/* <Image alt="user icon" src={halloweenImage} layout="responsive" /> */}
        <h1>Newest items</h1>
        <ItemsGridComponent />
        <h1>Sells in your city</h1>
        <ItemsGridComponent />
      </div>
    </>
  );
};

export default Home;
