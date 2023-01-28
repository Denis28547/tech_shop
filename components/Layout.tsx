import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch } from "../store/hooks";
import { setIsMobile } from "../store/reducers/SmallThingsSlice";

import Navbar from "./Navbar/Navbar";
import { ProfileNavbar } from "./Profile/ProfileNavbar";
import BottomPopUp from "./BottomPopUp";

import styles from "../styles/Main.module.scss";

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const router = useRouter();

  const disableNavbarForRoutes = {
    "/activate/[activationLink]": true,
    "/oautherror": true,
    "/redirect": true,
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.innerWidth <= 800) {
      dispatch(setIsMobile(true));
    }

    const handleResize = () => {
      if (window.innerWidth <= 800) {
        dispatch(setIsMobile(true));
      } else {
        dispatch(setIsMobile(false));
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar
        disabled={router.pathname in disableNavbarForRoutes ? true : false}
      />
      {router.pathname.includes("profile") && <ProfileNavbar />}
      <main className={styles.main}>{children}</main>
      <BottomPopUp />
    </>
  );
};

export default Layout;
