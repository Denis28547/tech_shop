import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "../../styles/smallPages/activate.module.scss";

import TickIcon from "../../public/assets/activate/TickIcon";
import CrossIcon from "../../public/assets/activate/CrossIcon";

const Activate: NextPage = () => {
  const [activated, setActivated] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const router = useRouter();

  const activateAccount = async () => {
    const { activationLink } = router.query;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/activate/${activationLink}`
      );
      setActivated(true);
    } catch (error: any) {
      setResponseError(true);
      setActivated(true);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query) return;

    activateAccount();
  }, [router.isReady]);

  useEffect(() => {
    if (redirectSeconds == 0) {
      router.push("/");
      return;
    }

    if (activated) {
      setTimeout(() => {
        setRedirectSeconds(redirectSeconds - 1);
      }, 2000);
    }
  }, [redirectSeconds, activated]);

  return (
    <div className={styles.main}>
      {activated ? (
        <div className={styles.info}>
          <div>
            {responseError ? (
              <h3>Something unexpected happened, please contact us</h3>
            ) : (
              <h3>Your account is successfully activated </h3>
            )}
            <p>
              You will be automatically redirected to main page in{" "}
              {redirectSeconds} seconds
            </p>
          </div>
          {responseError ? <CrossIcon /> : <TickIcon />}

          <Link href="/">
            <div className={styles.link_text}>To main page</div>
          </Link>
        </div>
      ) : (
        <div className={styles.info}>
          <h3>Activating your account</h3>
          <h3>LOADING</h3>
          <h2>.....</h2>
        </div>
      )}
    </div>
  );
};

export default Activate;
