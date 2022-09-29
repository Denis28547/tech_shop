import type { NextPage } from "next";
import { useRouter } from "next/router";

import { signIn, signOut, useSession } from "next-auth/react";
const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session);

  if (session.status === "loading") return <div>LOADING...</div>;
  return (
    <>
      <h1>{session.data?.user?.email}</h1>
      <h1>{session.data?.user?.name}</h1>
      <button onClick={() => signIn()}>SIGN IN</button>
      <button onClick={() => signOut()}>SIGN OUT</button>
      {!session.data && (
        <button onClick={() => router.push("/signup")}>SIGN UP</button>
      )}
    </>
  );
};

export default Home;
