import { useAppDispatch } from "../../store/hooks";
import { clearOneFilter } from "../../store/reducers/SearchSlice";

import styles from "../../styles/search/Top_Blocks_and_Queries.module.scss";

interface IQueryContainer {
  query: {
    [key: string]: string;
  };
  isMobile: boolean;
}

export const QueryContainer = ({ query, isMobile }: IQueryContainer) => {
  const dispatch = useAppDispatch();

  const deleteOneFilter = (key: any) => {
    dispatch(clearOneFilter(key));
  };

  return (
    <div
      className={`${styles.queries_container} ${
        isMobile
          ? styles.queries_container_mobile
          : styles.queries_container_computer
      }`}
    >
      {Object.keys(query).map((key, index) => {
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
  );
};
