import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAppSelector } from "../../store/hooks";
import Modal from "../Modal";
import NoAuthUserContainer from "./NoAuthUserContainer";
import UserContainer from "./UserContainer";

import LogoIcon from "../../public/assets/navbarIcons/Logo_WhiteIcon";
import ShopIcon from "../../public/assets/navbarIcons/ShopIcon";
import HeartIcon from "../../public/assets/HeartIcon";
import SettingsIcon from "../../public/assets/SettingsIcon";
import MessagesIcon from "../../public/assets/MessagesIcon";
import ThemeIcon from "./ThemeIcon";

import styles from "../../styles/navbar/MobileNavbar.module.scss";

interface IBurger {
  theme: string;
  handleSetTheme: () => void;
}

export const Burger = ({ theme, handleSetTheme }: IBurger) => {
  const { isMobile } = useAppSelector((state) => state.smallThings);
  const router = useRouter();
  const [isOpenMobileNavbar, setIsOpenMobileNavbar] = useState(false);
  const sidebarModalHandler = () => setIsOpenMobileNavbar(!isOpenMobileNavbar);

  const { status, data } = useSession();

  useEffect(() => {
    setIsOpenMobileNavbar(false);
    if (!isMobile) setIsOpenMobileNavbar(false);
  }, [router.asPath, isMobile]);

  return (
    <div className={styles.burger} onClick={sidebarModalHandler}>
      <Modal
        active={isOpenMobileNavbar}
        setActive={sidebarModalHandler}
        putChildrenInContainer={false}
      >
        <div
          className={`${styles.mobile_navbar} ${
            isOpenMobileNavbar ? styles.open_mobile_navbar : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.logo_and_profile}>
            <Link href="/">
              <a className={styles.logo_container}>
                <LogoIcon className={styles.logo_icon} theme={theme} />
                <p>Sell IT</p>
              </a>
            </Link>
            <span
              className={styles.close_modal}
              onClick={sidebarModalHandler}
            />

            {status !== "authenticated" ? (
              <div className={styles.profile_and_theme_container}>
                <NoAuthUserContainer
                  sidebarModalHandler={sidebarModalHandler}
                />
                <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
              </div>
            ) : (
              <div className={styles.profile_and_theme_container}>
                <UserContainer
                  userData={data}
                  sidebarModalHandler={sidebarModalHandler}
                />
                <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
              </div>
            )}
          </div>

          <Link href="/sellItem">
            <a className={styles.link_container}>
              <ShopIcon className={styles.icon} />
              <p>Sell Item</p>
            </a>
          </Link>

          <Link href="/profile/favorites">
            <a className={styles.link_container}>
              <HeartIcon className={styles.icon} style={{ strokeWidth: "2" }} />
              <p>Favorite Items</p>
            </a>
          </Link>

          <Link href="/profile/messages">
            <a className={styles.link_container}>
              <MessagesIcon className={styles.icon} />
              <p>Messages</p>
            </a>
          </Link>

          <Link href="/profile/settings">
            <a className={styles.link_container}>
              <SettingsIcon className={styles.icon} />
              <p>Settings</p>
            </a>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
