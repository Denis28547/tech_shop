import { ReactElement } from "react";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  const forbiddenRoutes = {
    "/activate/[activationLink]": true,
    "/": true,
    "/shop": true,
  };

  // if (router.pathname in forbiddenRoutes) console.log("true");
  // else console.log("false");
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
