import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OAthError: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || !router.query) return;
    if (router.query.error && router.query.error === "OAuthAccountNotLinked") {
      alert(
        "You already used this email to sign up, please, sign in with it again"
      );
      router.push("/");
    } else {
      alert("Something unexpected happened");
      router.push("/");
    }
  }, [router.isReady]);
  return null;
};

export default OAthError;
