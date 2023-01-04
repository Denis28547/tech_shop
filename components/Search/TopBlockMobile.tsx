import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeFilterSidebarState } from "../../store/reducers/SidebarSlice";

import FilterIcon from "../../public/assets/searchIcons/FilterIcon";
import CustomButton from "../CustomButton";
import { SortDropDown } from "./SortDropDown";

import styles from "../../styles/search/Top_Blocks_and_Queries.module.scss";

interface ITopBlockMobile {
  search: string;
  category: string;
}

export const TopBlockMobile = ({ search, category }: ITopBlockMobile) => {
  const dispatch = useAppDispatch();

  const { item_count } = useAppSelector((state) => state.search);

  return (
    <div className={styles.top_block_mobile}>
      <div className={styles.header}>
        <h2>
          {search && category
            ? `${category} » ${search}`
            : `${category || search}`}
        </h2>
        {item_count && (
          <p>
            we found {item_count} good{item_count === "1" ? "" : "s"}
          </p>
        )}
      </div>
      <div className={styles.button_container}>
        <CustomButton
          fontSize="1rem"
          buttonType="blue"
          fontWeight={600}
          width="50%"
          loading={false}
          text="Filters"
          height={54}
          onClick={() => dispatch(changeFilterSidebarState(true))}
        >
          <FilterIcon className={styles.filter_icon} />
        </CustomButton>

        <SortDropDown width={"50%"} />
      </div>
    </div>
  );
};
