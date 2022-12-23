import { useAppDispatch } from "../../store/hooks";
import { changeFilterSidebarState } from "../../store/reducers/SidebarSlice";

import FilterIcon from "../../public/assets/searchIcons/FilterIcon";
import CustomButton from "../CustomButton";

import styles from "../../styles/search/Top_Blocks_and_Queries.module.scss";

interface ITopBlockMobile {
  item_count: number | null;
  search: string;
  category: string;
}

export const TopBlockMobile = ({
  item_count,
  search,
  category,
}: ITopBlockMobile) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.top_block_mobile}>
      <div className={styles.header}>
        <h2>
          {search && category
            ? `${category} » ${search}`
            : `${category || search}`}
        </h2>
        {item_count !== null && (
          <p>
            we found {item_count} good{item_count === 1 ? "" : "s"}
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
          height={50}
          onClick={() => dispatch(changeFilterSidebarState(true))}
        >
          <FilterIcon className={styles.filter_icon} />
        </CustomButton>

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
    </div>
  );
};
