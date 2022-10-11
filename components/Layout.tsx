import { ReactElement } from "react";
import Navbar from "./navbar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
