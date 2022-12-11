import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "../store/hooks";
import { setIsMobile } from "../store/reducers/MobileSlice";

import Navbar from "./Navbar/Navbar";
import BottomPopUp from "./BottomPopUp";

import styles from "../styles/Main.module.scss";

const Layout = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const disableNavbarForRoutes = {
    "/activate/[activationLink]": true,
    "/oautherror": true,
    "/redirect": true,
  };

  useEffect(() => {
    if (window.innerWidth <= 650) {
      console.log(window.innerWidth);
      dispatch(setIsMobile(true));
    }
  }, []);

  return (
    <>
      <Navbar
        disabled={router.pathname in disableNavbarForRoutes ? true : false}
      />
      <main className={styles.main}>{children}</main>
      <BottomPopUp />
    </>
  );
};

export default Layout;
