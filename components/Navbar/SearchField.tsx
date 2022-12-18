import { useRouter } from "next/router";
import SearchIcon from "../../public/assets/navbarIcons/SearchIcon";
import { useAppDispatch } from "../../store/hooks";
import { clearAllFilters } from "../../store/reducers/SearchSlice";

import styles from "../../styles/navbar/Navbar.module.scss";

export const SearchField = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchInput: { value: string };
    };
    dispatch(clearAllFilters());
    console.log(target.searchInput.value);
    router.push(`/search/${target.searchInput.value}`);
  };

  return (
    <form className={styles.middle_container} onSubmit={handleSubmit}>
      <div className={styles.find_icon_container}>
        <SearchIcon className={`${styles.icon} ${styles.find_icon}`} />
      </div>
      <input
        placeholder="Search"
        className={styles.search_field}
        name="searchInput"
        autoComplete="off"
      />
      <button>FIND</button>
    </form>
  );
};
