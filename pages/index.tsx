import type { NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
const Home: NextPage = () => {
  return (
    <>
      <button onClick={() => signIn()}>SIGN IN WITH GITHUB</button>
      <button onClick={() => signOut()}>SIGN OUT</button>
    </>
  );
};

export default Home;
