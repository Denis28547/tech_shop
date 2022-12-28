import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateSortBy } from "../../store/reducers/SearchSlice";

import { Dropdown } from "../Dropdown";

interface ISortDropDown {
  width: string;
}

export const SortDropDown = ({ width }: ISortDropDown) => {
  const { sort: sortByState } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const dropDownOptions = [
    "cheap to expensive",
    "expensive to cheap",
    "newest",
    "name",
  ];

  const handleChangeSortBy = (option: string) => {
    dispatch(updateSortBy(option));
  };

  return (
    <Dropdown
      labelText="Sort by"
      dropDownOptions={dropDownOptions}
      selectedOption={sortByState}
      setSelectedOption={handleChangeSortBy}
      width={width}
    />
  );
};
