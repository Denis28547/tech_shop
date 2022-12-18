import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import SearchIcon from "../../public/assets/navbarIcons/SearchIcon";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearAllFilters,
  updateSearchAndClearFiltersState,
} from "../../store/reducers/SearchSlice";

import styles from "../../styles/navbar/Navbar.module.scss";

export const SearchField = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { search: searchState } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchInput: { value: string };
    };
    dispatch(updateSearchAndClearFiltersState(target.searchInput.value));
    router.push("/search");
  };

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = searchState;
  }, [searchState]);

  return (
    <form className={styles.middle_container} onSubmit={handleSubmit}>
      <div className={styles.find_icon_container}>
        <SearchIcon className={`${styles.icon} ${styles.find_icon}`} />
      </div>
      <input
        ref={searchRef}
        placeholder="Search"
        className={styles.search_field}
        name="searchInput"
        autoComplete="off"
      />
      <button>FIND</button>
    </form>
  );
};
