import { IItem } from "../../store/redux_types";
import ItemComponent from "./itemComponent";
import ItemSkeleton from "./ItemSkeleton";

import styles from "../../styles/item/ItemGridComponent.module.scss";
import { useGetAllItemsQuery } from "../../store/services/ItemService";

import axios from "axios";
import { useEffect, useState } from "react";

const ItemsGridComponent = () => {
  const { isLoading, data } = useGetAllItemsQuery(24);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`)
      .then((fav) => setFavorites(fav.data));
  }, []);

  console.log(favorites);

  let itemTemplates = [];
  for (let photoCount = 0; photoCount < 8; photoCount++) {
    itemTemplates.push(photoCount);
  }
  return (
    <div className={styles.grid}>
      {isLoading &&
        !data &&
        !favorites &&
        itemTemplates.map((_, index) => <ItemSkeleton key={index} />)}
      {data &&
        data.map((item) => {
          if (favorites.includes(item.id)) console.log("yes");
          return <ItemComponent key={item.id} item={item} />;
        })}
    </div>
  );
};

export default ItemsGridComponent;
