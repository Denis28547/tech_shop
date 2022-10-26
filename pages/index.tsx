import type { NextPage } from "next";
import { useRouter } from "next/router";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/test.module.scss";
import { useState } from "react";

const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  // console.log(session);
  // if (session.status === "authenticated") {
  //   const datething = session.data.expires;

  //   console.log(datething.toString());
  // }

  if (session.status === "loading") return <div>LOADING...</div>;
  return (
    <>
      <h1>{session.data?.user?.email}</h1>
      <h1>{session.data?.user?.name}</h1>

      {session.data && <button onClick={() => signOut()}>SIGN OUT</button>}
      {!session.data && <>BAGATITI</>}
    </>
  );
};

export default Home;
