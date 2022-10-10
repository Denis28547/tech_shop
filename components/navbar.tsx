import { NextPage } from "next";
import styles from "../styles/navbar/Navbar.module.scss";
import Link from "next/link";
import { useState } from "react";

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
  const [theme, setTheme] = useState(true); //night

  return (
    <nav className={styles.navbar}>
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
        <SearchIcon className={`${styles.icon} ${styles.find_icon}`} />
        <input placeholder="SEARCHFIELD" className={styles.searchfield} />
        <button>FIND</button>
      </div>

      <div className={`${styles.right_container} ${styles.flex_container}`}>
        <div className={styles.change_theme_container}>
          <NightIcon className={`${styles.icon} ${styles.night_icon}`} />
          <span className={styles.theme_bubble} />
          <DayIcon className={`${styles.icon} ${styles.day_icon}`} />
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
