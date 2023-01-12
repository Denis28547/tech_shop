import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import SearchIcon from "../../public/assets/navbarIcons/SearchIcon";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateSearchAndClearFiltersState } from "../../store/reducers/SearchSlice";

import styles from "../../styles/navbar/Navbar.module.scss";

export const SearchField = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchRef = useRef<HTMLInputElement>(null);
  const { search: searchState } = useAppSelector((state) => state.search);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchInput: { value: string };
    };
    dispatch(updateSearchAndClearFiltersState(target.searchInput.value));
    if (!router.asPath.includes("/search"))
      router.replace(`/search/${target.searchInput.value}`);
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
        title="use only letters and numbers"
        pattern="^[a-zA-Z0-9_.-]*$"
        maxLength={90}
      />
      <button>FIND</button>
    </form>
  );
};
