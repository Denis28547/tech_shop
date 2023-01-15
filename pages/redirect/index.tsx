import Link from "next/link";
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import TickIcon from "../../public/assets/redirect/TickIcon";
import CrossIcon from "../../public/assets/redirect/CrossIcon";

import styles from "../../styles/smallPages/redirect.module.scss";

const Redirect: NextPage = () => {
  const [mainText, setMainText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(10);

  const router = useRouter();

  useEffect(() => {
    const { text, success } = router.query as any;
    setMainText(text);
    if (success === "true") setIsSuccess(true);
    else setIsSuccess(false);
  }, [router.isReady]);

  useEffect(() => {
    if (redirectSeconds == 0) {
      router.replace("/");
      return;
    }

    let interval: number | null = null;

    if (mainText) {
      interval = window.setTimeout(() => {
        setRedirectSeconds((prevSec) => prevSec - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearTimeout(interval);
    };
  }, [mainText, redirectSeconds]);

  if (!mainText)
    return (
      <div className={styles.main}>
        <div className={styles.info}>
          <h3>LOADING</h3>
        </div>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <h3>{mainText}</h3>
        <p>
          You will be automatically redirected to main page in {redirectSeconds}{" "}
          seconds
        </p>
        {isSuccess ? (
          <TickIcon className={styles.icon} />
        ) : (
          <CrossIcon className={styles.icon} />
        )}
        <Link href="/">
          <a className={styles.link_text}>To main page</a>
        </Link>
      </div>
    </div>
  );
};

export default Redirect;
