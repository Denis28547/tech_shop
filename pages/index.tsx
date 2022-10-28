import type { NextPage } from "next";
import { useRouter } from "next/router";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/test.module.scss";
import { useState } from "react";
import Head from "next/head";

const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return <div>LOADING...</div>;
  return null;
};

export default Home;
