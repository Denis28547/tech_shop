import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IItem } from "../../store/redux_types";
import styles from "../../styles/itemPage/itemPageWrapper.module.scss";
import Image from "next/image";

const ItemPage = () => {
  const router = useRouter();
  const { item_id } = router.query;

  const [item, setItem] = useState<IItem>();

  useEffect(() => {
    if (!router.isReady) return;
    const findItem = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/item/${item_id}`
      );
      // console.log(res.data[0]);
      setItem(res.data[0]);
    };
    findItem();
  }, [router.isReady]);

  // console.log(item);

  // const item_image = `/Content/${item.images[0]}`;

  if (!item) return <h1>loading</h1>;

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>
        <PhotoBlock image={`/Content/${item.images[0]}`} />
        <DescriptionBlock item={item} />
      </div>
      <div className={styles.additional_info}>
        <UserBlock item={item} />
      </div>
    </div>
  );
};

const PhotoBlock = ({ image }) => {
  return (
    <div className={styles.photo_block}>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Image src={image} objectFit="cover" layout="fill" alt={"item image"} />
      </div>
    </div>
  );
};

const DescriptionBlock = ({ item }: { item: IItem }) => {
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

const UserBlock = ({ item }) => {
  return (
    <div className={styles.user_block}>
      <b>USER</b>
      {/* <Image src={image} objectFit="cover" layout="fill" /> */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={item.user.image}
          width={"65px"}
          height={"65px"}
          style={{ borderRadius: "50%" }}
          alt={"user image"}
        />
        <h3 style={{ marginLeft: "10px" }}>{item.user.name}</h3>
      </div>
      <button
        style={{
          backgroundColor: "#2c78c8",
          padding: "20px",
          borderRadius: "6px",
          fontWeight: "700",
          fontSize: "1.1rem",
        }}
      >
        Message
      </button>
    </div>
  );
};

export default ItemPage;
