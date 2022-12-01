import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IItemWithUser } from "../../store/redux_types";
import Image from "next/image";

import PhotoBlock from "../../components/ItemPage/PhotoBlock";
import DescriptionBlock from "../../components/ItemPage/DescriptionBlock";
import UserBlock from "../../components/ItemPage/UserBlock";

import styles from "../../styles/itemPage/itemPage.module.scss";
import { useGetItemByIdWithUserQuery } from "../../store/services/ItemService";

const ItemPage = () => {
  const [item, setItem] = useState<IItemWithUser>();
  const router = useRouter();
  const item_id = router.query.item_id as string;
  const { isLoading: isItemLoading, data: itemData } =
    useGetItemByIdWithUserQuery(item_id);

  useEffect(() => {
    console.log(item_id);
    if (!item_id) {
      return;
    } else {
      setItem(itemData);
    }
  }, [item_id]);

  if (isItemLoading || !item) return <h1>loading</h1>;

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
