import Link from "next/link";
import { useEffect, useState } from "react";

import ProfileComponent from "./ProfileComponent";
import { SearchField } from "./SearchField";
import LogoIcon from "../../public/assets/navbarIcons/Logo_WhiteIcon";
import ShopIcon from "../../public/assets/navbarIcons/ShopIcon";
import HeartIcon from "../../public/assets/HeartIcon";
import NightIcon from "../../public/assets/navbarIcons/NightIcon";
import DayIcon from "../../public/assets/navbarIcons/DayIcon";

import styles from "../../styles/navbar/Navbar.module.scss";

interface INavbar {
  disabled: boolean;
}

const Navbar = ({ disabled }: INavbar) => {
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
