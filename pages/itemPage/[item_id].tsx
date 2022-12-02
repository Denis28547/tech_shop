import axios from "axios";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { useGetItemByIdWithUserQuery } from "../../store/services/ItemService";
import PhotoBlock from "../../components/ItemPage/PhotoBlock";
import DescriptionBlock from "../../components/ItemPage/DescriptionBlock";
import UserBlock from "../../components/ItemPage/UserBlock";

import styles from "../../styles/itemPage/itemPage.module.scss";

const ItemPage = () => {
  const router = useRouter();
  const item_id = router.query.item_id;

  const {
    isLoading: isItemLoading,
    data: itemData,
    error,
  } = useGetItemByIdWithUserQuery(
    typeof item_id === "string" ? item_id : skipToken,
    {
      skip: router.isFallback,
    }
  );

  if (error) return <h1>error</h1>;
  if (isItemLoading || !itemData) return <h1>loading</h1>;

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_info}>
        <PhotoBlock images={itemData.images} />
        <DescriptionBlock item={itemData} />
      </div>
      <div className={styles.additional_info}>
        <UserBlock user={itemData.user} />
      </div>
    </div>
  );
};

export default ItemPage;
