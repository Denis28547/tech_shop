import { NextPage } from "next";
import styles from "../styles/navbar/Navbar.module.scss";
import CartIcon from "../public/assets/navbarIcons/CartIcon";
import ProfileIcon from "../public/assets/navbarIcons/ProfileIcon";
import NightIcon from "../public/assets/navbarIcons/NightIcon";
import DayIcon from "../public/assets/navbarIcons/DayIcon";
// import styles from "../styles/Home.module.css";

const Navbar: NextPage = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo_container}>
        <div>LOGO IMG</div>
        <div>LOGO</div>
      </div>
      <div className={styles.searchbar_container}>
        <input placeholder="SEARCHFIELD" className={styles.searchfield} />
        <button className={styles.search_button}>FIND</button>
      </div>
      <div className={styles.profile_cart_container}>
        <div className={styles.change_theme_container}>
          <NightIcon className={styles.profile_cart_icon} />
          <DayIcon className={styles.profile_cart_icon} />
        </div>
        <CartIcon className={styles.profile_cart_icon} />
        <ProfileIcon className={styles.profile_cart_icon} />
      </div>
    </div>
  );
};

export default Navbar;
