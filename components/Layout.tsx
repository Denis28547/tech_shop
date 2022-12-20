import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch } from "../store/hooks";
import { setIsMobile } from "../store/reducers/MobileSlice";

import Navbar from "./Navbar/Navbar";
import BottomPopUp from "./BottomPopUp";

import styles from "../styles/Main.module.scss";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  const disableNavbarForRoutes = {
    "/activate/[activationLink]": true,
    "/oautherror": true,
    "/redirect": true,
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.innerWidth <= 650) {
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
