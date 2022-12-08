import Link from "next/link";

import ItemsGridCard from "../Item/ItemsGridCard";
import { IItem, IItemWithCategory } from "../../types/index";

import styles from "../../styles/itemPage/UserItemsBlock.module.scss";

interface IUserItemsBlock {
  isItemsLoading: boolean;
  itemsData: IItem[] | IItemWithCategory[] | [];
  favoritesData: string[];
}

const UserItemsBlock = ({
  isItemsLoading,
  itemsData,
  favoritesData,
}: IUserItemsBlock) => {
  return (
    <>
      <div className={styles.user_items_top_flex}>
        <h2>Other items from this user</h2>
        <Link href="/profile">
          <a>all items</a>
        </Link>
      </div>

      <ItemsGridCard
        isItemsLoading={isItemsLoading}
        itemsData={itemsData}
        favoritesData={favoritesData}
        gridLayout="overflow"
      />
    </>
  );
};

export default UserItemsBlock;
