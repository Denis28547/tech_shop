import { ReactElement } from "react";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  return (
    <>
      <Navbar
        disabled={
          router.pathname === "/activate/[activationLink]" ? true : false
        }
      />
      <main>{children}</main>
    </>
  );
};

export default Layout;
