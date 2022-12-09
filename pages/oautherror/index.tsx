import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OAthError: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || !router.query) return;

    if (router.query.error && router.query.error === "OAuthAccountNotLinked") {
      router.push(
        `/redirect?text=${"You already used this email to sign up, please, sign in with it again"}&success=${false}`
      );
    } else {
      router.push(
        `/redirect?text=${"Something unexpected happened"}&success=${false}`
      );
    }
  }, [router.isReady]);
  return null;
};

export default OAthError;
