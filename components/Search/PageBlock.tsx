import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updatePage } from "../../store/reducers/SearchSlice";

import styles from "../../styles/search/PagesBlock.module.scss";

export const PageBlock = () => {
  const dispatch = useAppDispatch();

  const { page: pageState } = useAppSelector((state) => state.search);
  const pageStateNumber = Number(pageState);

  const pageCount = [];
  for (let pageIndex = 1; pageIndex <= 5; pageIndex++) {
    pageCount.push(pageIndex.toString());
  }

  return (
    <div className={styles.pages_container}>
      <div
        className={`${styles.arrow_container} ${styles.arrow_container_left}`}
        onClick={() => dispatch(updatePage((pageStateNumber - 1).toString()))}
      >
        <span className={styles.arrow} />
      </div>
      {pageCount.map((page, index) => (
        <div
          key={index}
          className={styles.page}
          onClick={() => {
            if (page === "1") dispatch(updatePage(""));
            else dispatch(updatePage(page));
          }}
        >
          {page}
        </div>
      ))}
      <div
        className={`${styles.arrow_container} ${styles.arrow_container_right}`}
        onClick={() => dispatch(updatePage((pageStateNumber + 1).toString()))}
      >
        <span className={styles.arrow} />
      </div>
    </div>
  );
};
