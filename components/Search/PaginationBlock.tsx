import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updatePage } from "../../store/reducers/SearchSlice";

import styles from "../../styles/search/PaginationBlock.module.scss";

interface IPaginationBlock {
  is_mobile?: boolean;
}

export const PaginationBlock = ({ is_mobile = false }: IPaginationBlock) => {
  const dispatch = useAppDispatch();

  const {
    page: pageState,
    item_count,
    items_on_page,
  } = useAppSelector((state) => state.search);
  const howManyPages = Math.ceil(Number(item_count) / Number(items_on_page));

  const currentPageNumber = pageState === "" ? 1 : Number(pageState);
  const currentPageString = currentPageNumber.toString();

  const pageCount: string[] = [];
  let firstPageToShow = currentPageNumber - 1;
  let lastPageToShow = currentPageNumber + 1;
  const createPagesArray = () => {
    pageCount.push("1");

    if (howManyPages <= 6) {
      // it works perfectly with 7+ pages
      for (let pageIndex = 2; pageIndex <= howManyPages; pageIndex++) {
        if (pageIndex > 0) pageCount.push(pageIndex.toString());
      }
      return;
    }

    if (currentPageNumber === 1) {
      //will add pages from 1 to 6 then ... then last page
      lastPageToShow += 4 - 1; // +4 to currentPage
      for (let pageIndex = 2; pageIndex <= lastPageToShow; pageIndex++) {
        if (pageIndex > 0) pageCount.push(pageIndex.toString());
      }
      pageCount.push("...");
    } else if (currentPageNumber === howManyPages) {
      //will add pages 1 then ... then from howManyPages - 5 to howManyPages
      pageCount.push("...");
      firstPageToShow += -4 + 1; // -4 to currentPage
      for (
        let pageIndex = firstPageToShow;
        pageIndex < howManyPages;
        pageIndex++
      ) {
        if (pageIndex > 0) pageCount.push(pageIndex.toString());
      }
    } else {
      //need to manipulate with lastpageto show and firstpagetoshow
      if (firstPageToShow > 2) pageCount.push("...");

      if (lastPageToShow >= howManyPages - 2)
        firstPageToShow = howManyPages - 4;

      for (
        let pageIndex = firstPageToShow;
        pageIndex < currentPageNumber;
        pageIndex++
      ) {
        if (pageIndex > 1) pageCount.push(pageIndex.toString());
      }

      if (firstPageToShow <= 2) lastPageToShow = 5;

      for (
        let pageIndex = currentPageNumber;
        pageIndex <= lastPageToShow;
        pageIndex++
      ) {
        if (pageIndex < howManyPages) pageCount.push(pageIndex.toString());
      }
      if (lastPageToShow < howManyPages - 1) pageCount.push("...");
    }

    pageCount.push(howManyPages.toString());
  };
  createPagesArray();

  type arrowType = "left" | "right";
  const arrowLeftEnabled = currentPageNumber !== 1;
  const arrowRightEnabled = currentPageNumber !== howManyPages;
  const checkIfCanPressArrow = (arrowDirection: arrowType): void => {
    if (arrowDirection === "left") {
      arrowLeftEnabled
        ? dispatch(updatePage((currentPageNumber - 1).toString()))
        : null;
    } else {
      arrowRightEnabled
        ? dispatch(updatePage((currentPageNumber + 1).toString()))
        : null;
    }
  };

  function pageToClick(page: string, index: number) {
    if (page !== "...") {
      dispatch(updatePage(page));
      return;
    }

    const middleArrayNumber = Math.floor(pageCount.length / 2);

    if (index < middleArrayNumber) {
      const dotsPageValue = (firstPageToShow - 1).toString();
      dispatch(updatePage(dotsPageValue));
    } else {
      const dotsPageValue = (lastPageToShow + 1).toString();
      dispatch(updatePage(dotsPageValue));
    }
  }

  if (howManyPages < 2) return <></>; //if only one page then don't show anything

  if (is_mobile)
    return (
      <div className={styles.pages_container}>
        <div className={styles.mobile_arrows_block}>
          <div
            className={`${styles.arrow_container}
        ${currentPageNumber === 1 ? styles.arrow_container_disabled : ""} ${
              styles.arrow_container_left
            } `}
            onClick={() => dispatch(updatePage(""))}
          >
            <span className={styles.pre_arrow} />
            <span className={styles.arrow} />
          </div>

          <div
            className={`${styles.arrow_container}
        ${!arrowLeftEnabled ? styles.arrow_container_disabled : ""} ${
              styles.arrow_container_left
            }`}
            onClick={() => checkIfCanPressArrow("left")}
          >
            <span className={styles.arrow} />
          </div>
        </div>

        <p>
          Page {currentPageNumber} of {howManyPages}
        </p>

        <div className={styles.mobile_arrows_block}>
          <div
            className={`${styles.arrow_container} ${
              !arrowRightEnabled ? styles.arrow_container_disabled : ""
            } ${styles.arrow_container_right}`}
            onClick={() => checkIfCanPressArrow("right")}
          >
            <span className={styles.arrow} />
          </div>

          <div
            className={`${styles.arrow_container} ${
              !arrowRightEnabled ? styles.arrow_container_disabled : ""
            } ${styles.arrow_container_right}`}
            onClick={() => dispatch(updatePage(howManyPages.toString()))}
          >
            <span className={styles.arrow} />
            <span className={styles.pre_arrow} />
          </div>
        </div>
      </div>
    );
  return (
    <div className={styles.pages_container}>
      <div
        className={`${styles.arrow_container}
        ${!arrowLeftEnabled ? styles.arrow_container_disabled : ""} ${
          styles.arrow_container_left
        }`}
        onClick={() => checkIfCanPressArrow("left")}
      >
        <span className={styles.arrow} />
      </div>

      <div className={styles.arrows_container}>
        {pageCount.map((page, index) => {
          return (
            <div
              data-active-page={currentPageString === page ? true : false}
              key={index}
              className={styles.page}
              onClick={() => {
                if (page === "1") dispatch(updatePage(""));
                else pageToClick(page, index);
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.arrow_container} ${
          !arrowRightEnabled ? styles.arrow_container_disabled : ""
        } ${styles.arrow_container_right}`}
        onClick={() => checkIfCanPressArrow("right")}
      >
        <span className={styles.arrow} />
      </div>
    </div>
  );
};
