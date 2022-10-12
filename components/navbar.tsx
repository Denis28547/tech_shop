import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import LogoIcon from "../public/assets/navbarIcons/Logo_WhiteIcon";
import SearchIcon from "../public/assets/navbarIcons/SearchIcon";
import ShopIcon from "../public/assets/navbarIcons/ShopIcon";
import CartIcon from "../public/assets/navbarIcons/CartIcon";
import ProfileIcon from "../public/assets/navbarIcons/ProfileIcon";
import NightIcon from "../public/assets/navbarIcons/NightIcon";
import DayIcon from "../public/assets/navbarIcons/DayIcon";

import styles from "../styles/navbar/Navbar.module.scss";

const Navbar: NextPage = () => {
  const [theme, setTheme] = useState("light"); //change to dark
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const lcTheme = localStorage.getItem("theme");
    if (lcTheme) setTheme(lcTheme);
  }, []);

  const handleClick = () => {
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left_container}>
        <Link href="/">
          <div className={styles.logo_container}>
            <LogoIcon className={styles.logo_icon} theme={theme} />
            <p className={styles.logo_name}>TechShop</p>
          </div>
        </Link>
        <Link href="/shop">
          <div className={styles.catalogue_container}>
            <ShopIcon className={styles.icon} />
            <p>Shop</p>
          </div>
        </Link>
      </div>

      <div className={styles.middle_container}>
        <div className={styles.find_icon_container}>
          <SearchIcon className={`${styles.icon} ${styles.find_icon}`} />
        </div>
        <input placeholder="Find" className={styles.searchfield} />
        <button>FIND</button>
      </div>

      <div className={`${styles.right_container} ${styles.flex_container}`}>
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
        <Link href="/cart">
          <>
            <CartIcon className={styles.icon} />
          </>
        </Link>

        <Link href="profile">
          <>
            <ProfileIcon className={styles.icon} />
          </>
        </Link>

        <span className={styles.burger}></span>
      </div>
    </nav>
  );
};

export default Navbar;
