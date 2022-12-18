import CustomButton from "../CustomButton";

import styles from "../../styles/search/Search.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { useRouter } from "next/router";
import {
  clearAllFilters,
  clearOneFilter,
} from "../../store/reducers/SearchSlice";

interface ITopBlock {
  item_count: number;
  query: {
    [key: string]: string | null;
  };
  searchText: string | null;
}

const TopBlock = ({ item_count, query, searchText }: ITopBlock) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const clearFilters = () => {
    if (searchText) {
      dispatch(clearAllFilters());
      router.push(`/search/${searchText}`);
      return;
    }
    dispatch(clearAllFilters());
    router.push("/search");
  };

  const deleteOneFilter = (key: any) => {
    dispatch(clearOneFilter(key));
  };

  return (
    <div className={styles.top_box}>
      <h2 className={styles.count_header}>
        We found {item_count} item{item_count === 1 ? "" : "s"}
      </h2>
      <div className={styles.queries_container}>
        {Object.keys(query).map((key, index) => {
          if (key === "searchText") return;
          return (
            query[key] && (
              <span
                key={index}
                className={styles.query}
                onClick={() => deleteOneFilter(key)}
              >
                <p>{`${key}: ${query[key]}`}</p>
                <span> ✕</span>
              </span>
            )
          );
        })}
      </div>

      <div
        style={{
          marginLeft: "auto",
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
          onClick={clearFilters}
        />
      </div>
    </div>
  );
};

export default TopBlock;
