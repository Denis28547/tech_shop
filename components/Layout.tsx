import { ReactElement } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
