import { useAppDispatch } from "../../store/hooks";
import { changeFilterSidebarState } from "../../store/reducers/SidebarSlice";

import FilterIcon from "../../public/assets/searchIcons/FilterIcon";
import CustomButton from "../CustomButton";

import styles from "../../styles/search/Search.module.scss";

export const TopBlockMobile = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.top_block_mobile}>
      <button onClick={() => dispatch(changeFilterSidebarState(true))}>
        <FilterIcon className={styles.filter_icon} />
        <p>Filters</p>
      </button>
      <CustomButton
        fontSize="1rem"
        buttonType="outline"
        fontWeight={600}
        width="50%"
        loading={false}
        text="Sort by"
        height={50}
      />
    </div>
  );
};
