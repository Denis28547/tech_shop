import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ProfileComponent from "./ProfileComponent";
import { useAppDispatch } from "../../store/hooks";
import { clearAllFilters } from "../../store/reducers/SearchSlice";
import LogoIcon from "../../public/assets/navbarIcons/Logo_WhiteIcon";
import SearchIcon from "../../public/assets/navbarIcons/SearchIcon";
import ShopIcon from "../../public/assets/navbarIcons/ShopIcon";
import HeartIcon from "../../public/assets/HeartIcon";
import NightIcon from "../../public/assets/navbarIcons/NightIcon";
import DayIcon from "../../public/assets/navbarIcons/DayIcon";
import { SearchField } from "./SearchField";

import styles from "../../styles/navbar/Navbar.module.scss";

interface INavbar {
  disabled: boolean;
}

const Navbar = ({ disabled }: INavbar) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  const nextTheme = theme === "light" ? "dark" : "light";

  const handleClick = () => {
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    const lcTheme = localStorage.getItem("theme");

    if (lcTheme && lcTheme !== theme) {
      setTheme(lcTheme);
    }
  }, [theme]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const target = e.target as typeof e.target & {
  //     searchInput: { value: string };
  //   };
  //   dispatch(clearAllFilters());
  //   console.log(target.searchInput.value);
  //   router.push(`/search/${target.searchInput.value}`);
  // };
  console.log("render");

  return (
    <nav
      className={styles.navbar}
      style={{ display: disabled ? "none" : "flex" }}
    >
      <div className={styles.left_container}>
        <Link href="/">
          <a className={styles.logo_container}>
            <LogoIcon className={styles.logo_icon} theme={theme} />
            <p className={styles.logo_name}>TechShop</p>
          </a>
        </Link>
      </div>
      {/* <form className={styles.middle_container} onSubmit={handleSubmit}>
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
      </form> */}
      <SearchField />

      <div className={styles.right_container}>
        <div
          className={styles.change_theme_container}
          data-theme={theme}
          onClick={handleClick}
        >
          <div className={styles.icon_container}>
            <NightIcon className={`${styles.icon} ${styles.night_icon}`} />
          </div>
          <span className={styles.theme_bubble} />
          <div className={styles.icon_container}>
            <DayIcon className={`${styles.icon} ${styles.day_icon}`} />
          </div>
        </div>

        <Link href="/profile/favorites">
          <a className={styles.icon_container}>
            <HeartIcon className={styles.icon} style={{ strokeWidth: "2" }} />
          </a>
        </Link>

        <Link href="/sellItem">
          <a className={styles.icon_text}>
            <ShopIcon className={styles.icon} />
            <p>Sell</p>
          </a>
        </Link>

        <ProfileComponent />

        <span className={styles.burger} />
      </div>
    </nav>
  );
};

export default Navbar;
