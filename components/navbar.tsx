import { NextPage } from "next";
import styles from "../styles/navbar/Navbar.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "../public/assets/icons/logo_black/100.png";
import SearchIcon from "../public/assets/navbarIcons/SearchIcon";
import ShopIcon from "../public/assets/navbarIcons/ShopIcon";
import CartIcon from "../public/assets/navbarIcons/CartIcon";
import ProfileIcon from "../public/assets/navbarIcons/ProfileIcon";
import NightIcon from "../public/assets/navbarIcons/NightIcon";
import DayIcon from "../public/assets/navbarIcons/DayIcon";
// import BurgerIcon from "../public/assets/navbarIcons/BurgerIcon";
import Image from "next/image";
// import styles from "../styles/Home.module.css";

const Navbar: NextPage = () => {
  const [theme, setTheme] = useState("dark"); //change to dark
  const [isChecked, setChecked] = useState(true);
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleClick = () => {
    setTheme(nextTheme);
  };

  return (
    <nav className={styles.navbar}>
      {/* <button onClick={handleClick}>THEME</button> */}
      <div className={styles.left_container}>
        <Link href="/">
          <div className={styles.logo_container}>
            <Image
              src={Logo}
              alt="logo"
              width="50"
              height="50"
              layout="fixed"
            />
            <p className={styles.logo_name}>TechShop</p>
          </div>
        </Link>
        <Link href="/shop">
          <div className={styles.catalogue_container}>
            <ShopIcon className={styles.icon} />
            <p>Items</p>
          </div>
        </Link>
      </div>

      <div className={styles.middle_container}>
        <div className={styles.find_icon_container}>
          <SearchIcon className={`${styles.icon} ${styles.find_icon}`} />
        </div>
        <input placeholder="SEARCHFIELD" className={styles.searchfield} />
        <button>FIND</button>
      </div>

      <div className={`${styles.right_container} ${styles.flex_container}`}>
        <div
          className={styles.change_theme_container}
          theme-={theme}
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
          <CartIcon className={styles.icon} />
        </Link>

        <Link href="profile">
          <ProfileIcon className={styles.icon} />
        </Link>

        <span className={styles.burger}></span>
      </div>
    </nav>
  );
};

export default Navbar;
