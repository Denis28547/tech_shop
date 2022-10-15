import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Modal from "./Modal";
import Auth from "./Auth";

import LogoIcon from "../public/assets/navbarIcons/Logo_WhiteIcon";
import SearchIcon from "../public/assets/navbarIcons/SearchIcon";
import ShopIcon from "../public/assets/navbarIcons/ShopIcon";
import CartIcon from "../public/assets/navbarIcons/CartIcon";
import ProfileIcon from "../public/assets/navbarIcons/ProfileIcon";
import NightIcon from "../public/assets/navbarIcons/NightIcon";
import DayIcon from "../public/assets/navbarIcons/DayIcon";

import styles from "../styles/navbar/Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
  const [theme, setTheme] = useState("light"); //change to dark
  const [authContainer, setAuthContainer] = useState(false);
  const nextTheme = theme === "light" ? "dark" : "light";

  //!
  const [modalActive, setModalActive] = useState(false);
  const modalHandler = () => setModalActive(!modalActive);
  //!

  const session = useSession();
  console.log("navbar");

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
      <Modal active={modalActive} setActive={modalHandler}>
        <Auth />
      </Modal>
      <button onClick={modalHandler}>OPE</button>
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
        <input placeholder="Search" />
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

        <CartIcon className={styles.icon} />

        <ProfileIcon
          className={styles.icon}
          onClick={() => setAuthContainer((prevState) => !prevState)}
        />

        <span className={styles.burger} />
      </div>

      {authContainer && (
        <div className={styles.auth_container}>
          {session.status === "authenticated" ? (
            <>
              <Link href="profile">
                <div className={styles.profile_container}>
                  {session.data?.user?.image ? (
                    <Image
                      alt="user icon"
                      src={session.data.user.image}
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <ProfileIcon //! MAKE PLACEHOLDER FOR AVATAR
                      className={styles.icon}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                  <div className={styles.profile_info}>
                    <h4>{session.data?.user?.name}</h4>
                    <h6>{session.data?.user?.email}</h6>
                  </div>
                </div>
              </Link>
              <hr />
              <a onClick={() => signOut()}>Sign out</a>
            </>
          ) : (
            <>
              <a onClick={() => signIn()}>Sign In</a>
              <hr />
              <Link href="/signup">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
