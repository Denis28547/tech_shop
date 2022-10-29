import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import halloweenImage from "../public/static/halloween_sale.jpg";

import ItemsGridComponent from "../components/ItemsGridComponent";

const Home: NextPage = () => {
  const router = useRouter();

  // if (session.status === "loading") return <div>LOADING...</div>;
  return (
    <>
      <div
        className="main_wrapper"
        style={{ maxWidth: "1200px", margin: "auto" }}
      >
        <Image
          alt="user icon"
          src={halloweenImage}
          // width={1200}
          layout="responsive"
          style={{ padding: "100px" }}
        />
        <h1>Newest items</h1>
        <ItemsGridComponent />
        <h1>Sells in your city</h1>
        <ItemsGridComponent />
      </div>
    </>
  );
};

export default Home;
