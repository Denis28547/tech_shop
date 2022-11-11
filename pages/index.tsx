import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import halloweenImage from "../public/static/halloween_sale.jpg";

import ItemsGridComponent from "../components/ItemsGridComponent";

import styles from "../styles/LandingPage.module.scss";

import { useSession } from "next-auth/react";
import { useGetAllItemsQuery } from "../store/services/ItemService";

const Home: NextPage = () => {
  const session = useSession();

  const { isLoading, data } = useGetAllItemsQuery();

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <>
      <div className={styles.main_wrapper}>
        <h1 className={styles.landing_h1}>VIP-items</h1>
        {data && <ItemsGridComponent data={data} />}
      </div>
    </>
  );
};

export default Home;
