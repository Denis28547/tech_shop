import { ReactElement } from "react";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  const forbiddenRoutes = {
    "/activate/[activationLink]": true,
    "/oautherror": true,
  };

  return (
    <>
      <Navbar disabled={router.pathname in forbiddenRoutes ? true : false} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
