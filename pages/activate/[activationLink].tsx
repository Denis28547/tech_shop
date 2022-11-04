import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "../../styles/smallPages/redirect.module.scss";

import TickIcon from "../../public/assets/redirect/TickIcon";
import CrossIcon from "../../public/assets/redirect/CrossIcon";

const responseDefault = {
  status: 200,
  message: "",
};

const Activate: NextPage = () => {
  const [activated, setActivated] = useState(false);
  const [response, setResponse] = useState(responseDefault);
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const router = useRouter();

  const errorMap = new Map([
    ["invalid link", "Invalid link, please contact us or make a new account"],
    ["account is already activated", "Your account was already activated"],
    [
      "something unexpected happened",
      "Something unexpected happened, please contact us",
    ],
  ]);

  const findError = (errMsg: string) => {
    return errorMap.get(errMsg);
  };

  const activateAccount = async () => {
    const { activationLink } = router.query;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/activate/${activationLink}`
      );
      setActivated(true);
    } catch (error: any) {
      const message = findError(error.response.data.message) as string;
      setResponse({
        status: error.response.status,
        message,
      });
      setActivated(true);
    }
  };

  useEffect(() => {
    if (!router.isReady || !router.query) return;
    activateAccount();
  }, [router.isReady]);

  useEffect(() => {
    if (redirectSeconds == 0) {
      // router.push("/");
      return;
    }

    if (activated) {
      setTimeout(() => {
        setRedirectSeconds(redirectSeconds - 1);
      }, 1000);
    }
  }, [redirectSeconds, activated]);

  return (
    <div className={styles.main}>
      {activated ? (
        <div className={styles.info}>
          <div>
            {response.status === 400 ? (
              response.message ? (
                <h3>{response.message}</h3>
              ) : (
                <h3>Something unexpected happened, please contact us</h3>
              )
            ) : (
              <h3>Your account is successfully activated </h3>
            )}
            <p>
              You will be automatically redirected to main page in{" "}
              {redirectSeconds} seconds
            </p>
          </div>
          {response.status === 400 ? <CrossIcon /> : <TickIcon />}

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
