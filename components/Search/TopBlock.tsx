import { useAppDispatch } from "../../store/hooks";
import { clearAllFilters } from "../../store/reducers/SearchSlice";

import CustomButton from "../CustomButton";
import { QueryContainer } from "./QueryContainer";

import styles from "../../styles/search/Top_Blocks_and_Queries.module.scss";

interface ITopBlock {
  item_count: number | null;
  query: {
    [key: string]: string;
  };
}

const TopBlock = ({ item_count, query }: ITopBlock) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.top_block}>
      {item_count !== null && (
        <h2 className={styles.count_header}>
          We found {item_count} good{item_count === 1 ? "" : "s"}
        </h2>
      )}

      <QueryContainer query={query} isMobile={false} />

      <div
        style={{
          marginLeft: "auto",
          alignSelf: "flex-start",
        }}
      >
        <CustomButton
          fontSize="1rem"
          buttonType="outline"
          fontWeight={600}
          borderColor="#f43c3d"
          width="200px"
          loading={false}
          text="Clear filters"
          height={50}
          margin="7px 0 7px 10px"
          onClick={() => dispatch(clearAllFilters())}
        />
      </div>
    </div>
  );
};

export default TopBlock;
