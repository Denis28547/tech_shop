import { ReactElement } from "react";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";

import styles from "../styles/Main.module.scss";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  const forbiddenRoutes = {
    "/activate/[activationLink]": true,
    "/oautherror": true,
    "/redirect": true,
  };

  return (
    <>
      <Navbar disabled={router.pathname in forbiddenRoutes ? true : false} />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
