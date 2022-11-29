import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IItem } from "../../store/redux_types";
import Image from "next/image";

import PhotoBlock from "../../components/ItemPage/PhotoBlock";
import DescriptionBlock from "../../components/ItemPage/DescriptionBlock";
import UserBlock from "../../components/ItemPage/UserBlock";

import styles from "../../styles/itemPage/itemPage.module.scss";

// interface ItemWithUser: IItem

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
      setItem(res.data[0]);
    };
    findItem();
  }, [router.isReady]);

  if (!item) return <h1>loading</h1>;

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>
        <PhotoBlock images={item.images} />
        <DescriptionBlock item={item} />
      </div>
      <div className={styles.additional_info}>
        <UserBlock user={item.user} />
      </div>
    </div>
  );
};

export default ItemPage;
