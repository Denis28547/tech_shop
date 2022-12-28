import ListLookBlock from "../Favorites/ListLookBlock";

import styles from "../../styles/search/Top_Blocks_and_Queries.module.scss";
import { SortDropDown } from "./SortDropDown";

interface ITopBarInItemsList {
  isWide: boolean;
  enableListLookChange: boolean;
  setIsWide: (isWide: boolean) => void;
}

const TopBarInItemsList = ({
  isWide,
  setIsWide,
  enableListLookChange,
}: ITopBarInItemsList) => {
  return (
    <div className={styles.top_bar_items}>
      {enableListLookChange && (
        <ListLookBlock isItemWide={isWide} setIsItemWide={setIsWide} />
      )}
      <SortDropDown width={"253px"} />
    </div>
  );
};

export default TopBarInItemsList;
